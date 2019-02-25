class Section {
    
    constructor(sectionTree) {
        this.status = sectionTree.status;
        this.section = sectionTree.section;
        this.href = sectionTree.href;
        this.activity = sectionTree.activity;
        this.term = sectionTree.term;
        this.interval = sectionTree.interval;
        this.days = sectionTree.days;
        this.start = sectionTree.start;
        this.end = sectionTree.end;
        this.comments = sectionTree.comments;
        this.subject_code = sectionTree.subject_code;
        this.course_number = sectionTree.course_number;
        this.section_number = sectionTree.section_number;
    }
}

module.exports = Section;