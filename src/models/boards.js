module.exports = (sequelize, DataTypes) => {
    const Boards = sequelize.define(
        'boards',
        {
            // Priamry Key
            boardNo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // notice: 공지글 | board: 일반글
            type: {
                type: DataTypes.STRING,
                defaultValue: 'board',
            },
            // 제목
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // 내용
            body: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // 조회 수
            hit: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            // 댓글 수
            commentCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            // 읽기 권한; 0: 전체 | 1: 회원만 | 2: 정회원만
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            // paranoid option
            paranoid: true,
        },
    );

    Boards.associate = (models) => {
        // 작성자
        Boards.belongsTo(models.users);
    };

    return Boards;
};
