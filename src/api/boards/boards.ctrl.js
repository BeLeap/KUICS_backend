const { boards, boardComments, sequelize } = require('../../models');

const getBoardList = async (req, res, next) => {
    try {
        const boardList = await boards.findAll({
            where: { type: 'board' },
            attributes: ['boardNo', 'title', 'hit', 'commentCount'],
        });

        res.json({ boardList });
    } catch (err) {
        next(err);
    }
    // TODO
    // 미리보기
};

const getBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;

        /* TODO: 삭제 여부 확인, error handling */
        /* TODO: 보기 권한 추가 (준회원, 정회원, 관리자) */
        await boards.update(
            { hit: sequelize.literal('hit + 1') },
            { where: { boardNo: boardId }, silent: true },
        );

        const board = await boards.findAll({
            where: { boardNo: boardId },
            attributes: [
                'boardNo',
                'type',
                'title',
                'body',
                'hit',
                'commentCount',
                'createdAt',
                'updatedAt',
                'deletedAt',
                'userUserNo',
            ],
        });

        /* TODO: 이미지, 파일 정보 추가 */
        /* TODO: comment 정보 추가 */
        /* TODO: 작성자 정보 추가 */

        res.json({ board });
    } catch (err) {
        next(err);
    }
};

const postBoard = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { title, body } = req.body;

        /* TODO: 권한 확인, error handling */
        /* TODO: 에러나는 경우에 boardNo 증가하지 않도록 처리 필요 */
        const board = await boards.create({
            title,
            body,
            type: 'board',
            hit: 0,
            commentCount: 0,
            userUserNo: userId,
        });

        /* TODO: 이미지, 파일 정보 추가 */
        res.json({ board });
    } catch (err) {
        next(err);
    }
};

const reviseBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        // const { userId } = req.query;
        const { title, body } = req.body;

        /* TODO: 권한 확인, 삭제 여부 확인, error handling */
        await boards.update({ title, body }, { where: { boardNo: boardId } });

        /* TODO: 이미지, 파일 정보 수정 (추가, 삭제) */
        res.json({});
    } catch (err) {
        next(err);
    }
};

const deleteBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        // const { userId } = req.query;

        /* TODO: 권한 확인, 삭제 여부 확인, error handling */
        await boards.destroy({ where: { boardNo: boardId } });

        /* TODO: 이미지, 파일 정보, 댓글 접근 불가능하도록 수정 */
        res.json({});
    } catch (err) {
        next(err);
    }
};

const postComment = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const { boardId } = req.params;
        const { body } = req.body;

        /* TODO: 권한 확인, 삭제 여부 확인, error handling */
        /* TODO: 원본 게시글 관련 처리 */
        await boardComments.create({
            body,
            recommendedTime: 0,
            userUserNo: userId,
            boardBoardNo: boardId,
        });

        res.json({});
    } catch (err) {
        next(err);
    }
};

const reviseComment = async (req, res, next) => {
    try {
        const { boardId, commentId } = req.params;

        res.json({ boardId, commentId });
    } catch (err) {
        next(err);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { boardId, commentId } = req.params;

        res.json({ boardId, commentId });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBoardList,
    getBoard,
    postBoard,
    reviseBoard,
    deleteBoard,
    postComment,
    reviseComment,
    deleteComment,
};
