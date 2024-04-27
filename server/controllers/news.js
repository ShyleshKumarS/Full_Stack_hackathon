const News = require('../models/news')

const getNews = async (req, res) => {
    console.log('getting news')
    const news = await News.find({})
    res.status(200).json(news)
}

const addNews = async (req, res) => {
    console.log('adding news')
    const {title, genre, description} = req.body
    try {
        const json = await News.create({title, genre, description})
        res.status(200).json(json)
    } catch(err) {
        res.status(400)
        console.log(err)
    }
}

const editNews = async (req, res) => {
    console.log('editing news')
    const {id} = req.params
    const news = await News.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!news) {
        return res.status(404).json({error: "No such news"})
    } else {
        return res.status(200).json(news)
    }
}

const deleteNews = async (req, res) => {
    console.log('deleting news')
    const {id} = req.params
    console.log(id)
    const news = await News.findOneAndDelete({_id: id})
    if (!news){
        return res.status(404).json({error: "No such news"})
    } else{
        return res.status(200).json(news)
    }

}

module.exports = { 
    addNews, 
    getNews,
    deleteNews,
    editNews
}