var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const phone = req.query.phone;
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (phoneReg.test(phone)) {
    res.status(200).json({ data: {
      phoneNumber:phone,
      res:"aabbbb"
    }, code: "200", msg: "message" });
  } else {
    res.status(500).json({ error: "message",code: "500" });
  }
});

module.exports = router;
