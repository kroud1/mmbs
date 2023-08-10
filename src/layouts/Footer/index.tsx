import React from 'react'
import { FOOTER_LIST } from '../../constants/layout-footer'


function Footer() {
  return (
    <footer>
      <div id='footer' className='mt90'>
        <div className='f_menu'>
          <div className='inner'>
            <ul>
              {/* FOOTER_LIST의 값을 순회하여 item변수에 할당 */}
              {FOOTER_LIST.map((item) => 
              <li>
                <a href="/" target='_blank'>{item}</a>
              </li>
              )}
            </ul>
            <div className='f_info'>
              <div className='address'>
                (주)몽몽책방 | 대표자명 : 이승아 | 사업자등록번호: 000-00-00000
                <a href="/" target='_blank'>
                  사업자정보 확인
                </a>
                | 통신 판매업신고: 부산진구-000
                <br/>
                부산광역시 부산진구 서면로 00 (우 : 00000) | 고객센터 : 0000-0000
                (월 ~ 금 09:00 ~ 18:00, 토/일 공휴일 휴무) |
                개인정보보호책임자 : 경영지원실 000 실장
                <p className='copy'>
                  COPYRIGHT @ MONGMONG THICKBIG. ALL RIGHTS RESERVED
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer