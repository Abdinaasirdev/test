import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../app/chatgpt-auth';
import { CATEGORIES,DEFAULT_SETTINGS,SAMPLE_PRODUCTS } from './catalog';
export function db(){if(!env.DB)throw new Error('Database is unavailable');return env.DB;}
export const now=()=>new Date().toISOString();
export const uid=()=>crypto.randomUUID();
export const q=(sql:string,...args:any[])=>db().prepare(sql).bind(...args);
export async function all(sql:string,...args:any[]){return (await q(sql,...args).all()).results as any[];}
export async function one(sql:string,...args:any[]){return await q(sql,...args).first() as any;}
export async function config(){const row=await one('SELECT value FROM store_settings WHERE id=?','main');return row?JSON.parse(row.value):DEFAULT_SETTINGS;}
export async function seed(){if(await one('SELECT id FROM store_settings WHERE id=?','main'))return;const at=now();const batch=[q('INSERT OR IGNORE INTO store_settings(id,value) VALUES(?,?)','main',JSON.stringify(DEFAULT_SETTINGS))];for(const c of CATEGORIES)batch.push(q('INSERT OR IGNORE INTO categories(id,name) VALUES(?,?)',c.id,c.name));for(const p of SAMPLE_PRODUCTS){batch.push(q('INSERT OR IGNORE INTO products(id,sku,name,description,category,price,compare_price,images,status,is_new,best_seller,is_sample,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',p.id,p.sku,p.name,'Sample style for exploring SOPIE. Photography, prices and quantities are demonstration content. Replace with your actual inventory before launch.',p.category,p.price,p.compare_price,JSON.stringify(['catalog:'+p.photo]),'active',p.is_new,p.best_seller,1,at));for(const s of (p.category==='hijabs'?['One size']:['S','M','L','XL','XXL']))batch.push(q('INSERT OR IGNORE INTO variants(id,product_id,size,color,stock,reserved) VALUES(?,?,?,?,?,?)',p.id+'-'+s,p.id,s,p.color,8,0));}await db().batch(batch);}
export async function identity(){const u=await getChatGPTUser();if(!u)return null;await q('INSERT OR IGNORE INTO profiles(id,email,name,created_at) VALUES(?,?,?,?)',u.userId,u.email,u.displayName,now()).run();return await one('SELECT * FROM profiles WHERE id=?',u.userId);}
export async function admin(){const u=await identity();if(!u)throw new ApiError('Please sign in',401);if(u.role!=='admin')throw new ApiError('Administrator access required',403);return u;}
export class ApiError extends Error{constructor(message:string,public status=400){super(message);}}
export function clean(v:any,max=500){if(typeof v!=='string')return '';return v.trim().slice(0,max);}
export function integer(v:any,min=0,max=100000000){if(!Number.isSafeInteger(v)||v<min||v>max)throw new ApiError('Enter a valid whole number');return v;}
export function phone(v:any){const s=clean(v,30);if(!/^\+?[\d\s()-]{9,20}$/.test(s))throw new ApiError('Enter a valid phone number');return s;}
export function origin(req:Request){const o=req.headers.get('origin');if(!o||![new URL(req.url).origin,'https://sopie-boutique.qaabeeye.chatgpt.site'].includes(o))throw new ApiError('Request origin is not permitted',403);}
export async function catalog(includeHidden=false){const rows=await all('SELECT p.*,COALESCE((SELECT SUM(i.quantity) FROM order_items i JOIN orders o ON o.id=i.order_id WHERE i.product_id=p.id AND o.status=\'Delivered\' AND o.is_demo=0),0) sold FROM products p'+(includeHidden?'':" WHERE p.status!='hidden'")+' ORDER BY p.created_at DESC');const vv=await all('SELECT * FROM variants');return rows.map(p=>({...p,images:JSON.parse(p.images),variants:vv.filter(v=>v.product_id===p.id)}));}
export async function getOrder(id:string){const order=await one('SELECT o.*,p.status payment_status FROM orders o JOIN payments p ON p.order_id=o.id WHERE o.id=?',id);if(!order)return null;return {...order,items:await all('SELECT * FROM order_items WHERE order_id=?',id)};}
