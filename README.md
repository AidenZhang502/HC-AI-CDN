# HC-AI-CDN 

https://hc-ai-cdn.vercel.app/manifest.json
https://hc-ai-cdn.vercel.app/all_in_one_pack.zip

mongodb+srv://aidendyzhang:2y2vuIif5Ro1EmYV@hc-cluster0.kisbgro.mongodb.net/?retryWrites=true&w=majority&appName=HC-Cluster0

https://hc-ai-cdn.vercel.app/api/envtest
现在应是：CDN_BASE_URL: true
https://hc-ai-cdn.vercel.app/api/dbcheck
预期：{ ok:true, db:"fitness", collections:["exercises", ...] }
https://hc-ai-cdn.vercel.app/api/manifest?tag=prod（或不带参数）
预期：{ count: <数字>, items:[ { key, action, url, ... } ] }
url 应该是 https://hc-ai-cdn.vercel.app/all_in_one_pack.zip 这种完整地址（如果 path 是相对的）
