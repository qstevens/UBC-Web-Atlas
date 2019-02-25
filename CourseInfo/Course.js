class Course {

    constructor(courseTree) {
        this.course_name = courseTree.course_name;
        this.subject_code = courseTree.subject_code;
        this.course_number = courseTree.course_number;
        this.course_title = courseTree.course_title;
        this.course_link = courseTree.course_link;
        if (courseTree.sections != undefined && courseTree.sections != null) 
            this.sections = Array.from(Object.keys(courseTree.sections));
    }

}
module.exports = Course;