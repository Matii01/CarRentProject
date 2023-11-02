function CarCalendar() {
  return (
    <>
      <div class="MuiGrid-root jss188 undefined MuiGrid-container MuiGrid-justify-xs-center">
        <div class="MuiGrid-root jss189 undefined MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-10">
          <div class="jss190">
            <div class="jss246 jss254">
              <div class="rbc-calendar">
                <div class="rbc-toolbar">
                  <span class="rbc-btn-group">
                    <button type="button">Today</button>
                    <button type="button">Back</button>
                    <button type="button">Next</button>
                  </span>
                  <span class="rbc-toolbar-label">November 2023</span>
                  <span class="rbc-btn-group">
                    <button type="button" class="rbc-active">
                      Month
                    </button>
                    <button type="button" class="">
                      Week
                    </button>
                    <button type="button" class="">
                      Day
                    </button>
                    <button type="button" class="">
                      Agenda
                    </button>
                  </span>
                </div>
                <div
                  class="rbc-month-view"
                  role="table"
                  aria-label="Month View"
                >
                  <div class="rbc-row rbc-month-header" role="row">
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Sun
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Mon
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Tue
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Wed
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Thu
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Fri
                      </span>
                    </div>
                    <div class="rbc-header">
                      <span role="columnheader" aria-sort="none">
                        Sat
                      </span>
                    </div>
                  </div>
                  <div class="rbc-month-row" role="rowgroup">
                    <div class="rbc-row-bg">
                      <div class="rbc-day-bg rbc-off-range-bg"></div>
                      <div class="rbc-day-bg rbc-off-range-bg"></div>
                      <div class="rbc-day-bg rbc-off-range-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg rbc-today"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                    </div>
                    <div class="rbc-row-content" role="row">
                      <div class="rbc-row ">
                        <div class="rbc-date-cell rbc-off-range" role="cell">
                          <a href="#" role="cell">
                            29
                          </a>
                        </div>
                        <div class="rbc-date-cell rbc-off-range" role="cell">
                          <a href="#" role="cell">
                            30
                          </a>
                        </div>
                        <div class="rbc-date-cell rbc-off-range" role="cell">
                          <a href="#" role="cell">
                            31
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            01
                          </a>
                        </div>
                        <div
                          class="rbc-date-cell rbc-now rbc-current"
                          role="cell"
                        >
                          <a href="#" role="cell">
                            02
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            03
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            04
                          </a>
                        </div>
                      </div>
                      <div class="rbc-row">
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "28.5714%", maxWidth: "28.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div
                            tabindex="0"
                            class="rbc-event event-azure rbc-event-allday"
                          >
                            <div
                              class="rbc-event-content"
                              title="Nud-pro Launch"
                            >
                              Nud-pro Launch
                            </div>
                          </div>
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div
                            tabindex="0"
                            class="rbc-event event-default rbc-event-allday"
                          >
                            <div
                              class="rbc-event-content"
                              title="All Day Event"
                            >
                              All Day Event
                            </div>
                          </div>
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div tabindex="0" class="rbc-event event-azure">
                            <div
                              class="rbc-event-content"
                              title="Birthday Party"
                            >
                              Birthday Party
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="rbc-row">
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "42.5714%", maxWidth: "42.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div tabindex="0" class="rbc-event event-green">
                            <div class="rbc-event-content" title="Meeting">
                              Meeting
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rbc-month-row" role="rowgroup">
                    <div class="rbc-row-bg">
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                    </div>
                    <div class="rbc-row-content" role="row">
                      <div class="rbc-row ">
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            05
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            06
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            07
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            08
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            09
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            10
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            11
                          </a>
                        </div>
                      </div>
                      <div class="rbc-row">
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "57.5714%", maxWidth: "57.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div tabindex="0" class="rbc-event event-red">
                            <div class="rbc-event-content" title="Lunch">
                              Lunch
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rbc-month-row" role="rowgroup">
                    <div class="rbc-row-bg">
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                    </div>
                    <div class="rbc-row-content" role="row">
                      <div class="rbc-row ">
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            12
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            13
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            14
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            15
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            16
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            17
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            18
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rbc-month-row" role="rowgroup">
                    <div class="rbc-row-bg">
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                    </div>
                    <div class="rbc-row-content" role="row">
                      <div class="rbc-row ">
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            19
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            20
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            21
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            22
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            23
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            24
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            25
                          </a>
                        </div>
                      </div>
                      <div class="rbc-row">
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "28.5714%", maxWidth: "28.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div tabindex="0" class="rbc-event event-orange">
                            <div
                              class="rbc-event-content"
                              title="Click for Creative Tim"
                            >
                              Click for Creative Tim
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="rbc-row">
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "28.5714%", maxWidth: "28.57" }}
                        >
                          {" "}
                        </div>
                        <div
                          class="rbc-row-segment"
                          style={{ flexBasis: "14.5714%", maxWidth: "14.57" }}
                        >
                          <div tabindex="0" class="rbc-event event-rose">
                            <div
                              class="rbc-event-content"
                              title="Click for Google"
                            >
                              Click for Google
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rbc-month-row" role="rowgroup">
                    <div class="rbc-row-bg">
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg"></div>
                      <div class="rbc-day-bg rbc-off-range-bg"></div>
                      <div class="rbc-day-bg rbc-off-range-bg"></div>
                    </div>
                    <div class="rbc-row-content" role="row">
                      <div class="rbc-row ">
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            26
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            27
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            28
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            29
                          </a>
                        </div>
                        <div class="rbc-date-cell" role="cell">
                          <a href="#" role="cell">
                            30
                          </a>
                        </div>
                        <div class="rbc-date-cell rbc-off-range" role="cell">
                          <a href="#" role="cell">
                            01
                          </a>
                        </div>
                        <div class="rbc-date-cell rbc-off-range" role="cell">
                          <a href="#" role="cell">
                            02
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarCalendar;
