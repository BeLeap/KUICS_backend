const { Router } = require('express');
const { isAuthenticated } = require('../auth/passport');
const {
    getUser,
    deleteUser,
    postUser,
    postNotice,
    postEditNotice,
    deleteNotice,
} = require('./admin.ctrl');

const router = Router();

router.get('/user', isAuthenticated, getUser); // 사용자 리스트
router.post('/user', isAuthenticated, postUser); // 사용자 추가
router.delete('/user/:user_id', isAuthenticated, deleteUser); // 사용자 삭제

router.post('/notice', isAuthenticated, postNotice); // 공지 작성
router.post('/notice/:notice_id', isAuthenticated, postEditNotice); // 공지 수정
router.delete('/notice/:notice_id', isAuthenticated, deleteNotice); // 공지 삭제

module.exports = router;
