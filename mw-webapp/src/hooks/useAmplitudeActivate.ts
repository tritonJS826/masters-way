/* eslint-disable max-len */
import {useEffect} from "react";
import {env} from "src/utils/env/env";

/**
 * Hook activate amplitude analytics on the prod
 */
export const useAmplitudeActivate = () => {
  useEffect(() => {
    if (env.ENV_TYPE === "prod") {
      const key = env.AMPLITUDE_KEY;

      const initAmplitudeScript = document.createElement("script");
      initAmplitudeScript.text = `
        !function(){
        "use strict";
        !function(e,t){var r=e.amplitude||{_q:[],_iq:{}};
        if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");
        else{var n=function(e,t){e.prototype[t]=function(){
        return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e._q.push({name:t,args:Array.prototype.slice.call(r,0)})},i=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))};o(e,t,Array.prototype.slice.call(arguments))}},a=function(e){for(var t=0;t<m.length;t++)i(e,m[t],!1);for(var r=0;r<g.length;r++)i(e,g[r],!0)};
        r.invoked=!0;var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-BWw9N39aN+4SdxZuwmRR0StXCLA+Bre4jR6bJt+pM1IqONNALC5rf25NkWMTyta5",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.9.3-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(c,u);for(var l=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],d=0;d<p.length;d++)n(l,p[d]);r.Identify=l;for(var f=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],y=0;y<v.length;y++)n(f,v[y]);r.Revenue=f;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];a(r),r.createInstance=function(e){return r._iq[e]={_q:[]},a(r._iq[e]),r._iq[e]},e.amplitude=r}
        
        const sessionReplayScript = document.createElement("script");
        sessionReplayScript.src = "https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.0-min.js.gz"; // Replace with the latest version
        sessionReplayScript.async = true;
        document.head.appendChild(sessionReplayScript);
        
        }(window,document)}();

        amplitude.init(${key});
      `;
      initAmplitudeScript.async = true;
      document.head.appendChild(initAmplitudeScript);
    }
  }, []);
};
