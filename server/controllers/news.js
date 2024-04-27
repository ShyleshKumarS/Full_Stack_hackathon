const News = require('../models/news')
const fs = require('fs')

const getNews = async (req, res) => {
    console.log('getting news')
    const {genre} = req.query
    try {
        var newsList = []
        if (genre) {
            newsList = await News.find({genre: genre})
        } else {
            newsList = await News.find({}).sort({createdAt: -1})
        }

        const newsWithImages = [];

        // Iterate over each news article
        for (const news of newsList) {
            // Read the image file from the file system
            const imagePath = `${__dirname}\\..\\${news.img}`;
            const imageData = fs.readFileSync(imagePath);
            const base64Image = imageData.toString('base64');

            // Construct an object with news details and base64-encoded image
            const newsData = {
                title: news.title,
                genre: news.genre,
                description: news.description,
                image: base64Image
            };

            // Add the news object to the array
            newsWithImages.push(newsData);
        }
        res.status(200).json(newsWithImages)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

const getSingleNews = async (req, res) => {
    console.log('getting single news')
    const { id } = req.params;
    try {
        const news = await News.findById(id);

        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        const imagePath = `${__dirname}\\..\\${news.img}`;
        console.log(imagePath)
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading image file' });
            }
            const responseData = {
                title: news.title,
                genre: news.genre,
                description: news.description,
                img: data.toString('base64') 
            };
            res.json(responseData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

const addNews = async (req, res) => {
    console.log('adding news')
    const {title, genre, description} = req.body
    const img = req.file.path;
    try {
        const json = await News.create({title, genre, description, img})
        res.status(200).json(json)
    } catch(err) {
        res.status(400)
        console.log(err)
    }
}

const editNews = async (req, res) => {
    console.log('editing news')
    const {id} = req.params
    const {title, genre, description} = req.body
    const img = req.file.path
    const news = await News.findOneAndUpdate({_id: id}, {
        title: title,
        genre: genre,
        description: description,
        img: img
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
    getSingleNews,
    deleteNews,
    editNews
}