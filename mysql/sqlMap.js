// sql语句
var sqlMap = {

    user:{
        getUser:'select * from user where id = ?',
        register:'insert into user(username,password) values(?,?)',
        login:'select * from user where username = ? and password = ?'
    },
    file:{
        createFolder:'insert into folder(user_id,folder_name,parent_id) values(?,?,?)',
        // 获取根目录
        folderStruct:`
        select * from folder where user_id = ?;
        select * from files where user_id = ?;
        `,
        // 保存文件内容
        upFile:'insert into files(user_id,folder_id,file_name,file_content,create_time,update_time) values(?,?,?,?,?,?)',
        fileDetail:'select * from files where id=?',
        updateFile: 'update files set file_name = ? , file_content = ? , update_time = ? , starTab=? , deleteTag = ?   where id =? ',
        latestFile:'select * from files where user_id = ? ORDER BY update_time desc; ',
        star:'update files set starTab=1  where id =? ',
        getStar:'select * from files where user_id = ? and starTab = 1',
        unStar:'update files set starTab=0  where id =? ',
        getUnStar:'select * from files where user_id = ? and starTab = 0',
        type:'update files set type=-2  where id =? ',
        search:"select * from files where file_name like ? and user_id = ? ; "
    },
    history:{
        getPeriod:'select * from period;',
        getEvents:'select * from events where periodID = ?;'
    }

}

module.exports = sqlMap;