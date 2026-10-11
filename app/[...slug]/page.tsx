import Store from '../Store';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
const pages=['shop','about','contact','policies','account','wishlist','admin','cart','checkout','confirmation'];
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;return {title:slug[0]==='product'?'Style details':slug[0].charAt(0).toUpperCase()+slug[0].slice(1)};}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;if(slug[0]==='product'&&slug.length===2)return <Store initialPage="product" productId={slug[1]}/>;if(slug.length===1&&pages.includes(slug[0]))return <Store initialPage={slug[0]}/>;notFound();}
