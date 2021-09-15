var express = require("express");
var router = express.Router();

// 连接数据库配置
var mysql = require("mysql");
var models = require("../mysql/db");
// 打包SQL语句
var $sql = require("../mysql/sqlMap");
// 连接数据库
var connection = mysql.createConnection(models.onlineNote);

connection.connect();

// 新建文件夹
router.post("/upDir", function (req, res, next) {
  // 获取 .headers("authToken", token)
  console.log(req.get("authToken"));
  const user = JSON.parse(req.get("authToken"));
  console.log("user", user);
  const { name } = req.body;
  const parentId = req.body.parentId === "" ? null : Number(req.body.parentId);
  console.log(parentId);
  const sql = $sql.file.createFolder;
  connection.query(sql, [user.id, name, parentId], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "创建失败", code: "500" }).end();
      return;
    } else {
      console.log(result);
      res
        .status(200)
        .json({
          msg: "success",
          code: "200",
          data: {
            id: result.insertId,
            userId: user.id,
            name: name,
            type: 1,
            parentId: parentId,
            children: [],
          },
        })
        .end();
    }
  });
});
router.get("/getStruct", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  //   console.log("user", user);
  //   console.log('query',req.query);
  //   console.log('body',req.body);
  const sql = $sql.file.folderStruct;
  console.log(user.id);
  connection.query(sql, [user.id, user.id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "获取失败", code: "500" }).end();
      return;
    } else {
      //filter不会改变原始数组,0文件夹，1是文件
      const struct = createStruct(result[0], result[1]);
      // console.log("struct", struct);

      function createStruct(folders, files) {
        const folderTemp = folders.map((item, index) => {
          return {
            id: item.id,
            userId: item.user_id,
            parentId: item.parent_id,
            type: item.type,
            name: item.folder_name,
            children: [],
          };
        });

        // console.log(typeof FolderTemp);
        // console.log("temp", folderTemp);
        const temp = [];
        const filesTemp = files.map((item) => {
          return {
            id: item.id,
            userId: item.user_id,
            name: item.file_name,
            type: item.type,
            parentId: item.folder_id,
            content: item.file_content,
            updateDate: item.update_time,
          };
        });
        // console.log("filesTemp", filesTemp);
        // 先添加文件
        for (let i = 0; i < filesTemp.length; i++) {
          if (filesTemp[i].parentId === null) {
            temp.push(filesTemp[i]);
          } else {
            for (let j = 0; j < folderTemp.length; j++) {
              if (filesTemp[i].parentId === folderTemp[j].id) {
                folderTemp[j].children.push(filesTemp[i]);
              }
            }
          }
        }
        // 再添加文件夹
        for (let i = 0; i < folderTemp.length; i++) {
          if (folderTemp[i].parentId !== null) {
            for (let j = 0; j < folderTemp.length; j++) {
              if (folderTemp[i].parentId === folderTemp[j].id) {
                folderTemp[j].children.push(folderTemp[i]);
              }
            }
          }
        }
        // console.log("temp",temp);
        const newStruct = folderTemp.concat(temp);
        // console.log("拼接",folderTemp);
        return newStruct.filter((value) =>
          value.parentId === null ? true : false
        );
      }
      // console.log(struct[0].children);
      res
        .status(200)
        .json({
          msg: "success",
          code: "200",
          data: struct,
        })
        .end();
    }
  });
});

router.post("/upNote", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  console.log(req.body);
  const { data } = req.body;
  const parentId = req.body.parentId === "" ? null : Number(req.body.parentId);
  console.log("parentId", parentId);
  const { content, title } = JSON.parse(data);
  const sql = $sql.file.upFile;
  const now = new Date();
  connection.query(
    sql,
    [user.id, parentId, title, content, now, now],
    function (err, result) {
      if (err) {
        console.log("11", err);
        res.status(500).json({ msg: err.message, code: "500" }).end();
      } else {
        console.log("select");
        const { insertId } = result;
        connection.query(
          `select * from files where id = ?`,
          [insertId],
          function (err, result) {
            if (err) {
              console.log("22", err);
              res.status(500).json({ msg: err.message, code: "500" }).end();
            } else {
              if (result.length > 0) {
                console.log(result);
                res
                  .status(200)
                  .json({
                    msg: "success",
                    code: "200",
                    data: {
                      id: result[0].id,
                      userId: result[0].user_id,
                      name: result[0].file_name,
                      type: result[0].type,
                      parentId: result[0].folder_id,
                      content: result[0].file_content,
                      updateDate: result[0].update_time,
                    },
                  })
                  .end();
              }
            }
          }
        );
      }
    }
  );
});

router.get("/getDetail", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const { ids: fileId } = req.query;
  const sql = $sql.file.fileDetail;

  connection.query(sql, [fileId], function (err, result) {
    if (err) {
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      const file = result[0];
      if (result.length > 0) {
        res
          .status(200)
          .json({
            msg: err,
            code: "200",
            data: [
              {
                id: file.id,
                userId: file.user_id,
                name: file.file_name,
                type: file.type,
                updateDate: file.update_time,
                content: file.file_content,
                starTag: file.starTab,
                deleteTag: file.deleteTag,
              },
            ],
          })
          .end();
      }
    }
  });
});

router.put("/updateNote", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));

  const { id } = req.body;
  const newData = req.body;
  const sql = $sql.file.updateFile;

  connection.query(
    sql,
    [
      newData.name,
      newData.content,
      new Date(),
      newData.starTag,
      newData.deleteTag,
      Number(id),
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err, code: "500" }).end();
      } else {
        res
          .send({
            msg: "success",
            code: "200",
          })
          .end();
      }
    }
  );
});

router.get("/getLatest", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.latestFile;

  connection.query(sql, [user.id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      if (result.length > 0) {
        console.log("getLatest", result);
        res
          .status(200)
          .json({
            msg: "success",
            code: "200",
            data: result.map(function (file, index) {
              return {
                id: file.id,
                userId: file.user_id,
                name: file.file_name,
                type: file.type,
                updateDate: file.update_time,
                content: file.file_content,
                starTag: file.starTab,
                deleteTag: file.deleteTag,
              };
            }),
          })
          .end();
      }
    }
  });
});
router.post("/star", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.star;
  const { id } = req.body;
  console.log(req.body);
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      res.status(200).json({ msg: err, code: "200" }).end();
    }
  });
});
router.get("/star", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.getStar;
  // const {id} = req.body;
  // console.log(req.body);
  connection.query(sql, [user.id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      if (result.length > 0) {
        res
          .status(200)
          .json({
            msg: "success",
            code: "200",
            data: result.map(function (file, index) {
              return {
                id: file.id,
                userId: file.user_id,
                name: file.file_name,
                type: file.type,
                updateDate: file.update_time,
                content: file.file_content,
                starTag: file.starTab,
                deleteTag: file.deleteTag,
              };
            }),
          })
          .end();
      }
    }
  });
});
router.post("/unStar", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.unStar;
  const { id } = req.body;
  console.log("id", id);
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      res.status(200).json({ msg: err, code: "200" }).end();
    }
  });
});

// 删除到回收站
// type
router.put("/type", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.type;
  const { id } = req.body;
  console.log("id", id);
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      res.status(200).json({ msg: err, code: "200" }).end();
    }
  });
});
router.get("/search", function (req, res, next) {
  const user = JSON.parse(req.get("authToken"));
  const sql = $sql.file.search;
  const { key } = req.query;
  console.log("key",key);
  connection.query(sql, [`%${key}%`,user.id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err, code: "500" }).end();
    } else {
      console.log("search", result);
      if (result.length > 0) {
     
        res
          .status(200)
          .json({
            msg: "success",
            code: "200",
            data: result.map(function (file, index) {
              return {
                id: file.id,
                userId: file.user_id,
                name: file.file_name,
                type: file.type,
                updateDate: file.update_time,
                content: file.file_content,
                starTag: file.starTab,
                deleteTag: file.deleteTag,
              };
            }),
          })
          .end();
      }
    }
  });
});
module.exports = router;
