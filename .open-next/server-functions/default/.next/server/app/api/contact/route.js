"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},56665:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>m,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>p});var n=r(49303),i=r(88716),s=r(60670),a=r(87070),d=r(82591);async function p(e){try{let t=process.env.RESEND_API_KEY,r=await e.json(),{fullName:o,email:n,subject:i,message:s}=r;if(!o||!n||!s)return a.NextResponse.json({error:"Missing required fields"},{status:400});if(!t||"your_api_key_here"===t||""===t)return console.warn("⚠️ RESEND_API_KEY is missing. Contact inquiry received (MOCKED):",r),a.NextResponse.json({success:!0,mock:!0,message:"Development Mock: Inquiry would be sent here if API key was present."});let p=new d.R(t),{data:l,error:c}=await p.emails.send({from:"Sanjivani FC <onboarding@resend.dev>",to:["tanmaygawali68@gmail.com"],replyTo:n,subject:`Coach Inquiry: ${i} - from ${o}`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #003087; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Message for Coach Neha</h1>
          </div>
          <div style="padding: 32px; color: #1e293b;">
            <h2 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 24px;">Inquiry Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Sender Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${o}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Sender Email:</td>
                <td style="padding: 8px 0;">${n}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0; color: #003087; font-weight: bold;">${i}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h3 style="margin-top: 0; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em; font-weight: 800;">Message Content</h3>
              <p style="line-height: 1.6; margin-bottom: 0; color: #334155;">${s}</p>
            </div>
            
            <div style="margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; font-style: italic;">
              This inquiry was sent via the Sanjivani FC Club Website contact portal.
            </div>
          </div>
        </div>
      `});if(c)return console.error("Resend Error:",c),a.NextResponse.json({error:c.message||"Email service error"},{status:500});return a.NextResponse.json({success:!0,data:l})}catch(e){return console.error("API Route Error:",e),a.NextResponse.json({error:e.message||"Internal Server Error"},{status:500})}}let l=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"D:\\Football_Website\\app\\api\\contact\\route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:u,serverHooks:g}=l,x="/api/contact/route";function m(){return(0,s.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[276,475],()=>r(56665));module.exports=o})();