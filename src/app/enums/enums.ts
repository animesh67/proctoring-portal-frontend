import { environment } from "../../environments/environment"

export const enums = {
    login: `${environment.server}/login`,
    profile: `${environment.server}/profile`,
    passwordChange:`${environment.server}/change-password`,
    getQuiz:`${environment.server}/quiz`,
    uploadQuiz:`${environment.server}/upload-quiz`,
    getSubjects:`${environment.server}/get-subjects`,
    registerUsers:`${environment.server}/addUsers`,
    students: `${environment.server}/get-students-list`,
    forgot:`${environment.server}/forgot-password`,
    postImage:`${environment.server}/post-image`,
    quizResult:`${environment.server}/results`,
    addUser:`${environment.server}/addUser`,
    addCourse:`${environment.server}/addCourse`,
    getImg:`${environment.server}/getImg`,
    quizPreview:`${environment.server}/quizPreview`,
    postuuid:`${environment.server}/liveProctoring`
}