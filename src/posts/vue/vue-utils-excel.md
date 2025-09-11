---
date: 2025-09-11
category:
  - vue
tag:
  - vue-utils
---

# Vue 前端excel工具类

## 📋 版本信息

- **Vue**: ^3.0.0+
- **file-saver**: 2.0.5
- **exceljs**: ^4.4.0


## 📝 功能介绍

- 支持前端对 Excel 文件（.xlsx）进行高性能筛选、删除、保留指定列等操作
- 按列名或列索引灵活删除或保留列

### 基础用法

```TypeScript
    import { saveAs } from "file-saver";

    const isExcel = await isExcelFile(blob);
    let processedBlob = blob;
    if (isExcel) {
    processedBlob = await ExcelFilterData(blob, {
        // 示例：删除指定列名的列
        // columnNamesToRemove: ["姓名"],

        // 示例：删除指定索引的列（从1开始）
        // columnsToRemove: [3, 5],

        // 示例：只保留指定列名的列
        columnNamesToKeep: ["姓名"],

        // 示例：只保留指定索引的列（从1开始）
        // columnsToKeep: [1, 2, 4],

        // 示例：自定义处理函数
        // customHandler: async (workbook) => {
        //   // 在这里可以进行更复杂的处理
        //   workbook.eachSheet(worksheet => {
        //     // 自定义处理逻辑
        //   });
        // }
    });
    }
    saveAs(processedBlob, filename);
```

## 🔧 工具源码

```TypeScript

import * as ExcelJS from "exceljs";

/**
 * 检测是否为 Excel 文件
 * @param data 原始 Blob 数据
 * @returns 是否为 Excel 文件
 */
export const isExcelFile = async (data: Blob): Promise<boolean> => {
  try {
    const arrayBuffer = await data.slice(0, 8).arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 检查是否为 xlsx 文件（ZIP 格式）
    const isXlsx =
      uint8Array[0] === 0x50 &&
      uint8Array[1] === 0x4b &&
      uint8Array[2] === 0x03 &&
      uint8Array[3] === 0x04;

    // 检查是否为旧版 xls 文件
    const isXls =
      uint8Array[0] === 0xd0 &&
      uint8Array[1] === 0xcf &&
      uint8Array[2] === 0x11 &&
      uint8Array[3] === 0xe0;

    if (!isXlsx && !isXls) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 处理和过滤Blob数据
 * @param data 原始 Blob 数据
 * @param options 处理选项
 * @returns 处理后的 Blob 数据
 */
export const ExcelFilterData = async (
  data: Blob,
  options?: {
    // 要删除的列索引数组（从1开始）
    columnsToRemove?: number[];
    // 要删除的列名数组
    columnNamesToRemove?: string[];
    // 要保留的列索引数组（从1开始）
    columnsToKeep?: number[];
    // 要保留的列名数组
    columnNamesToKeep?: string[];
    // 自定义处理函数
    customHandler?: (workbook: ExcelJS.Workbook) => Promise<void>;
  },
): Promise<Blob> => {
  try {
    // 如果没有提供处理选项，直接返回原始数据
    if (!options) {
      return data;
    }

    // 使用 ExcelJS 处理 Excel 文件
    const workbook = new ExcelJS.Workbook();

    const fullArrayBuffer = await data.arrayBuffer();
    await workbook.xlsx.load(fullArrayBuffer);
    workbook.clearThemes();

    // 遍历所有工作表
    workbook.eachSheet((worksheet) => {
      console.log(`处理工作表: ${worksheet.name}`);

      // 确保工作表有正确的维度
      if (worksheet.rowCount === 0) {
        return; 
      }

      // 处理要删除的列（按列名）
      if (
        options.columnNamesToRemove &&
        options.columnNamesToRemove.length > 0
      ) {
        const headerRow = worksheet.getRow(1); // 假设第一行是表头
        const columnsToDelete: number[] = [];

        headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
          const cellValue = String(cell.value || "");
          if (options.columnNamesToRemove?.includes(cellValue)) {
            columnsToDelete.push(colNumber);
          }
        });

        // 从后往前删除列，避免索引变化问题
        columnsToDelete
          .sort((a, b) => b - a)
          .forEach((colIndex) => {
            // 使用更安全的删除方式
            if (colIndex <= worksheet.columnCount) {
              worksheet.spliceColumns(colIndex, 1);
              console.log(`删除列: ${colIndex}`);
            }
          });
      }

      // 处理要删除的列（按索引）
      if (options.columnsToRemove && options.columnsToRemove.length > 0) {
        // 从后往前删除列
        const sortedColumns = [...options.columnsToRemove].sort(
          (a, b) => b - a,
        );
        sortedColumns.forEach((colIndex) => {
          worksheet.spliceColumns(colIndex, 1);
          console.log(`删除列索引: ${colIndex}`);
        });
      }

      // 处理要保留的列（按列名）
      if (options.columnNamesToKeep && options.columnNamesToKeep.length > 0) {
        const headerRow = worksheet.getRow(1);
        const columnsToKeep: number[] = [];

        headerRow.eachCell((cell, colNumber) => {
          const cellValue = String(cell.value || "");
          if (options.columnNamesToKeep?.includes(cellValue)) {
            columnsToKeep.push(colNumber);
          }
        });

        // 获取所有列索引
        const totalColumns = worksheet.columnCount;
        const columnsToDelete: number[] = [];
        for (let i = totalColumns; i >= 1; i--) {
          if (!columnsToKeep.includes(i)) {
            columnsToDelete.push(i);
          }
        }

        // 删除不需要保留的列
        columnsToDelete.forEach((colIndex) => {
          worksheet.spliceColumns(colIndex, 1);
        });
      }

      // 处理要保留的列（按索引）
      if (options.columnsToKeep && options.columnsToKeep.length > 0) {
        const totalColumns = worksheet.columnCount;
        const columnsToDelete: number[] = [];

        for (let i = totalColumns; i >= 1; i--) {
          if (!options.columnsToKeep.includes(i)) {
            columnsToDelete.push(i);
          }
        }

        columnsToDelete.forEach((colIndex) => {
          worksheet.spliceColumns(colIndex, 1);
        });
      }
    });

    // 执行自定义处理函数
    if (options.customHandler) {
      await options.customHandler(workbook);
    }
    const buffer = await workbook.xlsx.writeBuffer({
      useStyles: true,
      useSharedStrings: true,
    });

    const processedBlob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return processedBlob;
  } catch (error) {
    console.error("处理 Excel 文件时出错:", error);
    return data;
  }
};


```

## 注意事项

关于主题不兼容导致的 Excel 文件损坏问题说明：

在使用 ExcelFilterData 导出 Excel，打开可能会遇到如下报错：
“已删除的记录: /xl/workbook.xml 部分的 文档主题 (工作簿)”

解决方法：在处理 Excel 文件时，调用 `workbook.clearThemes()` 方法以移除主题，避免该兼容性问题。