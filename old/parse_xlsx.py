import simplejson
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
            "pages": self.__load_pages(),
            "annualSchedule": self.__load_annual_schedule(),
            "practiceSchedule": self.__load_practice_schedule(),
            "members": self.__load_member(),
            "santamaResult": self.__load_santama_results(),
            "leagueResult": self.__load_league_result(),
            "obMessages": self.__load_ob_messages(),
        }
        with open("src/content.json", "w") as f:
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
            if type(v) == str:
                return v.split(",")
            return []

        res = []
        for row in df.to_dict(orient="records"):
            row["positions"] = split(row["positions"])
            row["oldPositions"] = split(row["oldPositions"])
            res.append(row)
        return res

    def __load_santama_results(self):
        names = ["year", "title", "fileName"]
        df = read_excel(
            self.filepath,
            sheet_name="三多摩大会結果",
            skiprows=1,
            header=None,
            names=names,
            usecols="A:C",
        )
        return df.to_dict(orient="records")

    def __load_pages(self):
        names = ["id", "title", "description"]
        df = read_excel(
            self.filepath,
            sheet_name="ページ",
            skiprows=1,
            header=None,
            names=names,
            usecols="A:C",
            index_col="id",
        )
        return df.to_dict(orient="index")

    def __load_league_result(self):
        names = ["year", "m", "w"]
        df = read_excel(
            self.filepath,
            sheet_name="リーグ戦結果",
            skiprows=1,
            header=None,
            names=names,
            usecols="A:C",
        )
        return df.to_dict(orient="records")

    def __load_ob_messages(self):
        names = ["obMessageId", "year", "title", "fileName"]
        df = read_excel(
            self.filepath,
            sheet_name="OB通信",
            skiprows=1,
            names=names,
            header=None,
            usecols="A:D",
        )
        return df.to_dict(orient="records")


l = WorkSheetLoader("./test.xlsx")
l.exec()