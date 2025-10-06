const config = {
    env: {
        databaseUrl: process.env.DATABASE_URL!,
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
            redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        
        resendToken: process.env.RESEND_TOKEN!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
        openAiApiKey: process.env.OPENAI_API_KEY!,
    }

}

export default config;

