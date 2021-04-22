from os import name
import simplejson
from openpyxl import load_workbook
from pandas import read_excel


class WorkSheetLoader:
    ANNUAL_SCHEDULE = "年間スケジュール"
    PRACTICE_SCHEDULE = "練習スケジュール"
    MEMBER = "部員一覧"
    OB_MESSAGE = "OB通信"
    SANTAMA = "三多摩大会結果"

    def __init__(self, filepath: str):
        self.filepath = filepath

    def exec(self):
        result = {
            "annualSchedule": self.__load_annual_schedule(),
            "practiceSchedule": self.__load_practice_schedule(),
            "member": self.__load_member(),
        }
        with open("content.json", "w") as f:
            simplejson.dump(
                result, f, ensure_ascii=False, indent=2, sort_keys=True, ignore_nan=True
            )

    def __load_annual_schedule(self):
        names = ["date", "title", "description"]
        df = read_excel(
            self.filepath,
            sheet_name=self.ANNUAL_SCHEDULE,
            skiprows=1,
            header=None,
            names=names,
            usecols="A:C",
        )
        return df.to_dict(orient="records")

    def __load_practice_schedule(self):
        names = ["dow", "normal", "holiday"]
        df = read_excel(
            self.filepath,
            sheet_name=self.PRACTICE_SCHEDULE,
            skiprows=1,
            header=None,
            names=names,
            usecols="A:C",
        )
        return df.to_dict(orient="records")

    def __load_member(self):
        names = [
            "lastName",
            "firstName",
            "gender",
            "admissionYear",
            "faculty",
            "positions",
            "oldPositions",
            "highschool",
        ]
        df = read_excel(
            self.filepath,
            sheet_name=self.MEMBER,
            skiprows=1,
            header=None,
            names=names,
            usecols="A:H",
        )

        def split(v):
            if type(v) != "str":
                return []
            return v.split(",")

        res = []
        for row in df.to_dict(orient="records"):
            row["positions"] = split(row["positions"])
            row["oldPositions"] = split(row["oldPositions"])
            res.append(row)
        return res


l = WorkSheetLoader("./test.xlsx")
l.exec()