import dotenv from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const config = {
    api: {
        groups_per_page: parseInt(process.env.GROUPS_PER_PAGE ?? '4'),
        items_per_group: parseInt(process.env.ITEMS_PER_GROUP ?? '5'),
        products_per_page: parseInt(process.env.PRODUCTS_PER_PAGE ?? '3'),
        sites_per_page: parseInt(process.env.SITES_PER_PAGE ?? '5'),
        sort_by: process.env.SORT_BY ?? 'latest',
    },

    app: {
        host: process.env.HOST ?? '0.0.0.0', // App Listener Host
        port: process.env.PORT ?? 3000, // App Listener Port
    },

    browser: {
        user_agent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
    },

    logs: {
        path: process.env.LOG_PATH ?? '/app/logs',
    },

    mail: {
        type: process.env.MAIL_TYPE ?? 'smtp',
        config: {
            smtp: {
                host: process.env.MAIL_HOST ?? '',
                port: process.env.MAIL_PORT ?? '',
                auth: {
                    user: process.env.MAIL_USERNAME ?? '',
                    pass: process.env.MAIL_PASSWORD ?? '',
                },
            },
            postmark: {
                token: process.env.MAIL_TOKEN ?? '',
            },
        },
        from: process.env.MAIL_FROM ?? 'support@faive.com',
    },

    mongo: {
        uri: process.env.MONGODB_URI ?? 'mongodb://mongo_db:27017/faive_app',
    },

    openai: {
        api_key: process.env.OPENAI_API_KEY ?? '',
    },

    otp: {
        length: process.env.OTP_LENGTH ? parseInt(process.env.OTP_LENGTH) : 6,
        type: process.env.OTP_TYPE ?? 'alphanumeric',
    },

    paths: {
        public: `${path.join(__dirname, 'public')}`,
    },

    proxy: {
        host: process.env.PROXY_HOST ?? '',
        username: process.env.PROXY_USERNAME ?? '',
        password: process.env.PROXY_PASSWORD ?? '',
    },
    s3: {
        cdn: process.env.S3_CDN_URL,
        origin: process.env.S3_ORIGIN_URL,
        accessKey: process.env.S3_ACCESS_KEY_ID,
        secretKey: process.env.S3_SECRET_KEY,
        bucketName: process.env.S3_BUCKET_NAME,
        bucketRegion: process.env.S3_BUCKET_REGION,
    },
    redis: {
        host: process.env.REDIS_HOST ?? '',
        port: process.env.REDIS_PORT ?? '',
        username: process.env.REDIS_USERNAME ?? '',
        password: process.env.REDIS_PASSWORD ?? '',
    },
    meise: {
        host: process.env.MEISE_HOST ?? '',
        apiKey: process.env.MEISE_KEY ?? '',
    },
    elasticsearch: {
        host: process.env.ELASTICSEACRH_HOST ?? '',
        port: process.env.ELASTICSEACRH_PORT ?? '',
        apiKey: process.env.ELASTICSEACRH_APIKEY ?? '',
    },
    basicAuth:{
        username: process.env.BASIC_USERNAME ?? '',
        password: process.env.BASIC_PASSWORD ?? '',
    }
}

export default config


