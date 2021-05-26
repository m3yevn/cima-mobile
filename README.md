# 🚧 CIMA Mobile 
by m3yevn and team

#### ✅ The requirement for this project:
 - Supplier “WSR” delivers steel components. The components in shape of cube, cone or spherical.
 - If the component is more than 10kg weight and the shape is cube, a test is required to be carried out by a “MXY” Laboratory.
 - The result of this test must be submitted to the Client within 2 working days. Whenever the result status is “fail”, the payment of steel must be reduced by 50%.

#### ✅ To do:
 - Prepare an application so that the supervisor accepting delivery can input date / Item description, cost, weight of the item and photo. The app should be able to detect the shape based on the photo.
 - Based on the weight and shape, the app should prepare a test list for MXY laboratory
 - In the same app, prepare a module for MXY laboratory supervisor to login using advanced techniques such as fingerprint or OTP sent to mobile. The MXY supervisor can input the result for the item. The result may be in form of test result (results could be : 0, less than 15%, 15% to 50% or more than 50%). Status = Fail if test result is more than 50%.
 - App should send reminders to MXY by email if the test result is not submitted within 2 working days of delivery (Cron Job) [https://github.com/m3yevn/cima-cron]
 - App should generate monthly payment summary to Supplier WSR. (CIMA Web Admin)
 - App should generate daily report of tests and a summary monthly report to submit to the client (CIMA Web Admin)

## 🏃‍♂️ How to run 
### 1. install RN dependencies
```
yarn install
```

### 2. install iOS SDK
```
cd ios
pod install
```

### 3. run
```
react-native run-ios
```
or

```
react-native run-android
```
