// require('./04-自定义模块')
// console.log('05de自定义模块')
// ===========
// let people=require('./04-自定义模块')
// console.log(people)
// { name: 'hanhan', age: 10 }
// ==========

// =========使用计算两个数的和
// let r=require('./04-自定义模块')
// // console.log(r)
// let obj=new r.Stu('hanhan',999);
// // console.log(obj.name)//hanhan
// console.log(obj.age)//99

//================导入类
// let Stu=require('./04-自定义模块')
// // console.log(Stu)//[Function: Stu]
// let obj=new Stu('xixi',12);
// console.log(obj.age)//12

// ============a+b使用计算两个数的和
let obj=require('./mathTool')
// console.log(obj)
console.log(obj.sum(1,7))