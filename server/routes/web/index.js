module.exports = app =>{
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  router.get('/news/init',async(req,res)=>{
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["斗气化马群英会，主播VS职业选手", "云中君源·梦皮肤台词语音研讨会开启公告", "王者荣耀IP新游《代号：启程》亮相荣耀盛典", "日活跃用户数日均1亿！    《王者荣耀》感谢每一个不可或缺的你！", "11月1日周年庆典观看盛典奖励领取未到账说明", "11月9日体验服专区维护公告", "11月7日体验服停机更新公告", "11月7日体验服停机更新公告", "11月6日峡谷异闻生涯称号局内显示异常说明", "11月5日峡谷异闻剧情视频播放异常说明", "【美梦成真 抽内测皮肤】活动公告", "周年祈愿送永久英雄/皮肤", "王者共创，荣耀盛典，抽内测、赢永久、限定皮肤自选限时返场", "【手Q用户专属】周年庆返场皮肤免单活动", "【微信用户专属】微信小程序“游戏礼品站”购买返场皮肤抽免单活动", "2020年秋冬赛事战令全新升级，终极奖励韩信星元皮肤等你拿！", "2020年KPL秋季赛9月16日热血开赛，主场地域化全面升级", "2020年KPL秋季赛热血来袭，线下售票9月7日12:00开启！", "2020年KGL秋季赛选手大名单公布，9月13日该我上场！", "2020年KPL秋季赛大名单公布"]
    const newsList = newsTitles.map(title=>{
      const randomCats = cats.slice(0).sort((a,b)=>Math.random()-0.5)
      return {
        categories: randomCats.slice(0,2),
        title: title
      }
    })
    res.send(newsList)
  })

  app.use('/web/api',router)
}