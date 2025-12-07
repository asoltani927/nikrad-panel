export class CacheService {
  constructor(private redis: any) {}

  async getTTL() {
    const ttl = await this.redis.get('config:cache_ttl')
    return ttl ? Number(ttl) : 60
  }

  async setTTL(ttl: number) {
    await this.redis.set('config:cache_ttl', ttl.toString())
    return ttl
  }
}
