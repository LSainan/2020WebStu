// require('./05-使用自定义模块')
// console.log("04的自定模块...")
// ============
// var name='hanhan';
// var age=10;
// exports.name=name;
// exports.age=age;
// =============使用exports.Stu=Stu;向外暴露一个类
// function Stu(name,age){
//     this.name=name;
//     this.age=age;
// }
// exports.Stu=Stu;
// //得到一个对象
// new Stu()
// let s=new Stu('hanhan',666)
// // console.log(s.name)
// exports.Stu=Stu;

// ==========使用module.exports=Stu向外暴露一个类
function Stu(name,age){
this.name=name;
this.age=age;
}
module.exports=Stu