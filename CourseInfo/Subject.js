class Subject {

    constructor(subjectTree) {
        this.code = subjectTree.code;
        this.link = subjectTree.link;
        this.title = subjectTree.title;
        this.faculty = subjectTree.faculty;
        if (subjectTree.courses != undefined && subjectTree.courses != null) 
            this.courses = Array.from(Object.keys(subjectTree.courses));
    }
}

module.exports = Subject;