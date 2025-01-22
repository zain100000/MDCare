const express = require('express');
const { addVideo, editVideo, deleteVideo, getAllVideo, getVideo,SearchVideo } = require('../controllers/video');
const router = express.Router();

router.post('/add-video', addVideo);
router.post('/edit-video', editVideo);
router.post('/delete-video', deleteVideo);
router.get('/get-videos', getAllVideo);
router.get('/get-video', getVideo);
router.post("/search-video",SearchVideo);


module.exports = router;
