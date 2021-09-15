// sql语句
var sqlMap = {
    // 用户
    // student: {
    //     add: 'insert into user(id, name, age) values (0, ?, ?)',
    //     selectAll: 'select * from students',
    //     selectOne: `
    //         select * from students where sno = ?;
    //         select * from s_sc_c_tc_t where sno = ?;
    //         select * from teaching_task;
    //     `,
    //     updatePass: 'update students set PASSWORD = ? where sno =? ',
    //     select:' insert into sc values(?,?,null,?)',
    //     unselect:'delete from sc where sno=? and cno=? and tno=?'
    // },
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
    }
    // register: {
    //     check: 'SELECT * FROM user WHERE sno = ? AND PASSWORD = ?'
    // }
}

module.exports = sqlMap;