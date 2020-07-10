const gulp=require("gulp");
const clean=require("gulp-clean");
const uglify=require("gulp-uglify");
const concat=require("gulp-concat");
const cleanCss=require("gulp-clean-css");

gulp.task("copyImg",function () {
    return gulp.src("./public/html/*.html").pipe(gulp.dest("dist/html"))
});

gulp.task("clean",function () {
    return  gulp.src("./dist") .pipe(clean())
});