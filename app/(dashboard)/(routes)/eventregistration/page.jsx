<div className="text-center mb-4 text-border flex-col">
        <h1 className="font-bold text-[3rem] text-border-white" style={{ ...neonTextStyle }}>TechFusion&apos;24 Registration</h1>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-center bg-emerald-100">
          <CardHeader>
            <CardTitle>Already Registered ?</CardTitle>
          </CardHeader>
          <CardContent>
                <Button className='justify-center' variant="" onClick={()=>{router.push('/sign-in')}}>Sign In Now</Button>
          </CardContent>
        </Card>
        <Card className="mx-auto w-4/5 max-w-xl mt-2 mb-2 text-left">
          <CardHeader>
            <CardTitle>For all your queries, feel free to contact:</CardTitle>
            <CardDescription />
          </CardHeader>
          <CardContent className="grid gap-4 lg:gap-2 lg:grid-cols-2">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="avatar_02.png" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div className="gap-1">
                  <p className="text-sm font-medium leading-none">Mohit Kumar</p>
                  <a href="https://wa.me/917257827104?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917257827104</a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="avatar_02.png" />
                  <AvatarFallback>KG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Kumar Gaurav</p>
                  <a href="https://wa.me/917004174269?text=Hello!%20I%20have%20some%20Query%20related%20to%20Registration." target="_blank" rel="noopener noreferrer" className="text-sm text-blue-800">+917004174269</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mx-auto w-4/5 max-w-xl mb-8 text-left">
          <CardContent>
              <div className="flex items-center justify-center text-center pt-4 mb-8 mt-8">
                <p className="font-bold text-xl font-mono text-red-600">Oops! Event Participation is closed now!</p>
              </div>
              <div className="flex flex-col items-center pt-4">
                <p className="font-semibold font-mono mb-10">Having Issue with Participation contact Event coordinator</p>
                {/* <Button className='justify-center mb-10' variant="" onClick={()=>{router.push('/torchbearers/campusambassador')}}>Find Your Campus Ambassador</Button> */}
              </div>
          </CardContent>
        </Card>
      </div>