const express = require("express");
const router = express.Router();
const { youtubedl } = require('@bochilteam/scraper-sosmed');
/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
  try {
    if (!req.query.q) return res.json({"status": "masukan parameter q"})
    let yt = await youtubedl(req.query.q)
    let awal = yt
    let akhir = yt
    Object.entries(awal.video).forEach(v => {
       akhir.video[v[0]].download = await v[1].download()
    })
    res.json(akhir);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
