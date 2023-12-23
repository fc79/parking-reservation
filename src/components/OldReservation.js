const OldReservation = () => {
  return (
    <>
      {' '}
      <div className="ress-container">
        <Card className="ressform" style={{ width: '90%' }}>
          <Card.Body className="rselectsect">
            <Card.Title>{location.state.parkingName}</Card.Title>
            <Card.Text>
              <h3 style={{ fontSize: '18px' }}>آدرس </h3>
              <p
                className="display-4"
                style={{ fontSize: '14px', overflowWrap: 'break-word' }}
              >
                {location.state.location}
              </p>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush lgcolor">
            <ListGroupItem
              className="lgcolor"
              style={{ background: 'transparent' }}
              color="primary"
            >
              <div className="d-flex justify-content-around">
                <div>
                  <h3 style={{ fontSize: '18px' }}>ظرفیت خالی</h3>
                  <p style={{ fontSize: '16px' }}>
                    {location.state.capacity - filledCapacity}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px' }}>امتیاز</h3>
                  <Rating
                    name="read-only"
                    value={location.state.rating}
                    readOnly
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px' }}>تلفن</h3>
                  <p style={{ fontSize: '16px' }}>{location.state.number}</p>
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem
              className="lgcolor"
              style={{ background: 'transparent' }}
              color="primary"
            >
              <h3 style={{ fontSize: '18px' }}>هزینه به ازای هر ساعت</h3>
              <p style={{ fontSize: '16px' }}>{location.state.pricePerHour}</p>
            </ListGroupItem>
            <ListGroupItem
              className="lgcolor"
              style={{ background: 'transparent' }}
              color="primary"
            >
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-center">
                  <h3 style={{ fontSize: '14px' }}>
                    انتخاب تاریخ و ساعت ورود :
                  </h3>
                  <Typography
                    style={{ wordWrap: 'break-word', fontSize: '12px' }}
                    variant="h5"
                    className=""
                  >
                    {/* <DateTimePicker
                      clearable
                      okLabel="تأیید"
                      cancelLabel="لغو"
                      ampm={false}
                      // labelFunc={(date) =>
                      //   date ? date.format("YYYY/MM/DD hh:mm:ss") : ""
                      // }
                      labelFunc={(date) =>
                        date ? date.format('jYYYY/jMM/jDD HH:mm ') : ''
                      }
                      value={enter}
                      onChange={handleEnterChange}
                      disablePast
                      size="small"
                    /> */}
                    <div>
                      <DateTimePicker
                        onChange={handleEnterChange}
                        value={enter}
                        format="dd-MM-yyyy mm:HH"
                      />
                    </div>
                  </Typography>
                </div>

                <div className="d-flex justify-content-center">
                  <h3 style={{ fontSize: '14px' }}>
                    انتخاب تاریخ و ساعت خروج :
                  </h3>
                  <Typography
                    style={{ wordWrap: 'break-word' }}
                    variant="h5"
                    className=""
                  ></Typography>
                </div>
                <div>
                  <DateTimePicker
                    onChange={handleExitChange}
                    value={exit}
                    format="dd-MM-yyyy mm:HH"
                  />
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem
              className="lgcolor"
              style={{ background: 'transparent' }}
              color="primary"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">خودرو</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={car}
                  label="Age"
                  onChange={(e) => handleCarChange(e)}
                >
                  {cars.map((car) => {
                    return <MenuItem value={car.id}>{car.carName}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <div className="d-flex justify-content-around">
              <button
                onClick={handleSubmitButton}
                className="ButtonGlobal mt-auto "
              >
                رزرو!
              </button>
              <button
                onClick={(e) => {
                  histo.push('/UserPannel');
                }}
                className="ButtonGlobal mt-auto "
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
            {reserveOk === null ? null : reserveOk != 0 ? (
              <Collapse dir="rtl" in={open}>
                <Alert
                  dir="rtl"
                  severity="success"
                  style={{ zIndex: '1000', marginTop: '3%' }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                      dir="rtl"
                    >
                      <CloseIcon dir="rtl" fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  رزرو شما با موفقیت انجام شد. هزینه رزرو : {resData.cost} تومان
                </Alert>
              </Collapse>
            ) : (
              <Collapse dir="rtl" in={open}>
                <Alert
                  dir="rtl"
                  severity="error"
                  style={{ zIndex: '1000', marginTop: '3%' }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                      dir="rtl"
                    >
                      <CloseIcon dir="rtl" fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  متاسفانه امکان رزرو در این روز و ساعت وجود ندارد
                </Alert>
              </Collapse>
            )}
            <br />
            <Comments />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default OldReservation;
