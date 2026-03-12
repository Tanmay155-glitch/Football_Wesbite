"use strict";(()=>{var e={};e.id=294,e.ids=[294],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},86346:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>m,requestAsyncStorage:()=>c,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>p});var i=r(49303),n=r(88716),a=r(60670),s=r(87070),d=r(82591);async function p(e){try{let t=process.env.RESEND_API_KEY,r=await e.json(),{fullName:o,rollNumber:i,department:n,position:a,contact:p,statement:l}=r;if(!o||!p)return s.NextResponse.json({error:"Missing required fields"},{status:400});if(!t||"your_api_key_here"===t)return console.warn("⚠️ RESEND_API_KEY is missing. Application received (MOCKED):",r),s.NextResponse.json({success:!0,mock:!0,message:"Development Mock: Application would be sent here if API key was present."});let c=new d.R(t),{data:u,error:g}=await c.emails.send({from:"Sanjivani FC <onboarding@resend.dev>",to:["tanmaygawali68@gmail.com"],subject:`New Player Application: ${o}`,html:`
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1e40af; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Player Application Received</h1>
          </div>
          <div style="padding: 32px; color: #1e293b;">
            <h2 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 24px;">Applicant Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Full Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${o}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Roll Number:</td>
                <td style="padding: 8px 0;">${i}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Department:</td>
                <td style="padding: 8px 0;">${n}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Position:</td>
                <td style="padding: 8px 0; color: #1e40af; font-weight: bold;">${a}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contact No:</td>
                <td style="padding: 8px 0; font-weight: 600;">${p}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Statement of Interest</h3>
              <p style="line-height: 1.6; margin-bottom: 0;">${l}</p>
            </div>
            
            <div style="margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center;">
              This email was generated automatically by the Sanjivani FC recruitment portal.
            </div>
          </div>
        </div>
      `});if(g)return console.error("Resend Error:",g),s.NextResponse.json({error:g.message||"Email service error"},{status:500});return s.NextResponse.json({success:!0,data:u})}catch(e){return console.error("API Route Error:",e),s.NextResponse.json({error:e.message||"Internal Server Error"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/recruit/route",pathname:"/api/recruit",filename:"route",bundlePath:"app/api/recruit/route"},resolvedPagePath:"D:\\Football_Website\\app\\api\\recruit\\route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:u,serverHooks:g}=l,x="/api/recruit/route";function m(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[276,475],()=>r(86346));module.exports=o})();