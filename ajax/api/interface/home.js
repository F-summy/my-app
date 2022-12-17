import ajax from '../../http.js'
//选项卡
export const get_label_list = data => ajax({
	name: 'get_label_list',
	data
})
//文章列表
export const get_article_list = data => ajax({
	name: 'get_article_list',
	data
})
//用户登录
export const get_userInfo = data => ajax({
	name: 'get_userInfo',
	data
})
//获取验证码
export const get_code_num = data => ajax({
	name: 'get_code',
	data
})

//用户收藏

export const save_like_article = data => ajax({
	name: 'save_like_article',
	data
})

//搜索内容
export const get_search_list = data => ajax({
	name: 'get_search_list',
	data
})

//标签管理
export const updata_label_list = data => ajax({
	name: 'updata_label_list',
	data
})

//文章详情
export const get_article_detail = data => ajax({
	name: 'get_article_detail',
	data
})

//发文章评论
export const get_comment_content = data => ajax({
	name: 'get_comment_content',
	data
})
//获取文章评论
export const get_comment_list = data => ajax({
	name: 'get_comment_list',
	data
})

//关注作者
export const updata_follow_author = data => ajax({
	name: 'updata_follow_author',
	data
})
//文章点赞
export const thumbs_up_article = data => ajax({
	name: 'thumbs_up_article',
	data
})
//关注文章
export const get_follow_article = data => ajax({
	name: 'get_follow_article',
	data
})

//关注作者
export const get_follow_author = data => ajax({
	name: 'get_follow_author',
	data
})

//关注作者的文章
export const get_my_article = data => ajax({
	name: 'get_my_article',
	data
})
//意见反馈
export const get_update_path = data => ajax({
	name: 'get_update_path',
	data
})
//更改用户头像
export const update_user_avatar = data => ajax({
	name: 'update_user_avatar',
	data
})
