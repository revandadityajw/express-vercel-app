const express = require("express");
const router = express.Router();
const { youtubedl } = require('@bochilteam/scraper-sosmed');
/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.post("/", async (req, res) => {
  try {
    if (!req.body.url) return res.json({"status": "masukan parameter q"})
    let yt = await youtubedl(req.body.url)
    let awal = yt
    let akhir = yt
    async function convert() {
    Object.entries(awal.video).forEach(async v => {
       akhir.video[v[0]].download = await v[1].download()
    })
      return true
    }
      convert().then(() => {
    res.json(akhir);
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
