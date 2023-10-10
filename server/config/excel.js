import Excel from "exceljs";

export const generateBlogs = async (blogs) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Blog List");
    const headerRow = worksheet.addRow(["Username", "Text"]);
    headerRow.font = { bold: true };

    for (const blog of blogs) {
        const user = await UserModel.findOne({ username: blog.user.username });

        worksheet.addRow([user.username, blog.text]);
    }

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 50;

    return workbook;
};
