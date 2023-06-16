import { Link, NavLink } from "react-router-dom";

import * as EgovNet from "api/egovFetch";
import SearchBar from "components/SearchBar";
import { default as EgovLeftNav } from "components/leftmenu/EgovLeftNavSupport";
import Table1 from "components/table1";
import URL from "constants/url";
import EgovModal from "pages/about/EgovModal2";
import { useCallback, useEffect, useRef, useState } from "react";

function EgovDownloadList() {
  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const createPopUpRef = useRef();
  const [contentData, setContentData] = useState([]);
  const getPetBoardList = useCallback(() => {
    const url = "/pet/user/boardListAPI.do";
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(),
    };

    EgovNet.requestFetch(
      url,
      options,
      (res = []) => {
        console.log(res.result.resultList);
        let arr = [];
        res.result.resultList.map((item) => {
          arr.push({
            title: item.title,
            user: item.userId,
            name: item.name,
            description: item.content,
            seq: item.seq,
          });
        });
        setContentData(arr);
      },
      (e) => {
        console.log("PET LIST ERR!!--- ", e);
      }
    );
  }, []);

  useEffect(() => {
    getPetBoardList();
  }, []);

  const onOpenPopup = () => {
    createPopUpRef.current.setOpenPopUp(true);
  };

  return (
    <>
      <EgovModal
        open={createPopupOpen}
        ref={createPopUpRef}
        onReset={getPetBoardList}
        title = {'물품 등록'}
      />
      <div className="container">
        <div className="c_wrap">
          <div className="layout">
            {/* <!-- Navigation --> */}
            <EgovLeftNav></EgovLeftNav>
            {/* <!--// Navigation --> */}
            <div className="contents SERVICE_INTRO" id="contents">
              {/* <!-- 본문 --> */}
              <div className="top_tit">
                <h1 className="tit_1">마켓</h1>
              </div>

              <h2 className="tit_2">중고 마켓</h2>

              <div className="left_col btn1 mg20 mgl0">
                {/* <Link
                  to={URL.SUPPORT_DOWNLOAD_CREATE2}
                  className="btn btn_upload"
                > */}
                <button className="btn_upload btn" onClick={onOpenPopup}>
                  물품 등록
                </button>
                {/* </Link> */}
              </div>
              <SearchBar />
              <h2 className="tit_4">무료 나눔</h2>
              <Table1 data={contentData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EgovDownloadList;
