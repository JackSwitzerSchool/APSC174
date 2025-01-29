interface Config {
  baseUrl: string
  title: string
  description: string
}

const defaultConfig: Config = {
  baseUrl: 'https://apsc174.vercel.app',
  title: 'APSC 174: Linear Algebra for Engineers',
  description: 'Course notes and materials for APSC 174'
}

const devConfig: Config = {
  baseUrl: 'http://localhost:3000',
  title: 'APSC 174 (Dev)',
  description: 'Course notes and materials for APSC 174 (Development)'
}

const prodConfig: Config = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || defaultConfig.baseUrl,
  title: defaultConfig.title,
  description: defaultConfig.description
}

const config: Config = process.env.NODE_ENV === 'production' 
  ? prodConfig 
  : process.env.NODE_ENV === 'development'
    ? devConfig
    : defaultConfig

export default config 