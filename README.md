# App tạo từ create-react-app

## Dev enviroment, deploy, cách vận hành

### Server link trong url.js

```
const backend_url = window.location.host.includes('localhost') ? 'http://localhost:5000' : 'https://Hotelbackendasm2.ducminh27.repl.co';
```

Dưới dev enviroment server là localhost:5000, deploy server sẽ là https://Hotelbackendasm2.ducminh27.repl.co và deploy
server có coldstart nên sẽ load sản phẩm lần đầu tiên trong 30s

### Deploy site

https://hotel-asm.firebaseapp.com/ với account có sẵn là xxx@x.com với password 4444 hoặc có thể
vào https://hotel-asm.firebaseapp.com/user để tạo user mới, tài khoản này không có quyền admin để edit thông tin khách
sạn những đã có sẵn 1 loạt transaction trong https://hotel-asm.firebaseapp.com/transaction.

## Cách vận hành

Sử dụng react context để thực hiện post request khi khách hàng thực hiện search khách sạn phù hợp, react date để chọn
date object trong react context. Chức năng đặt phòng còn trống được sử dụng qua việc load thông tin từ server để kiểm
tra thời gian trống của phòng.

## Chi tiết chức năng

### Context cho lệnh search

Context sử dụng hook useMemo ở ngoài App.js để update ngày khách hàng muốn tới nơi. Ngoài ra context cũng là State khi
ta edit các thông tin như số người lớn, trẻ em, ngày đi, ngân sách thì context sẽ được update qua mọi page để dễ dàng
tìm kiếm khách sạn phù hợp

### Fetch thông tin trên homepage

Các loại property, như Hotel, Apartment... , cũng như số lượng tại mỗi thành phố được lấy trên /home của server về,
server lấy document của mongodb để tạo ra một Object lớn chứa số lượng hotels từng loại ở từng thành phố. Coldstart của
Server sẽ khiến cho
tất cả các con số là 0(state ban đầu) trong lần đầu mở site, nhưng sau tầm 30s sẽ được update.

### Mọi transaction của user

Thực hiện get request với /booking/idUser để lấy toàn bộ, userID(không phải username) được lưu trong Localstorage mỗi
khi đăng nhập và xóa khi signout

### Kiểm tra thời gian trống của phòng trong khách sạn

Room được tạo component riêng và có sẵn thông tin những ngày trống từ server bên trong Object Room, mỗi lần thay đổi
thời gian trên Client, Object Room này sẽ so sánh
với date bên trong, nếu date bên trong của Room Object không chứa thì vẫn hiển thị, nếu có chứa thì bị giấu đi, không
thể tick được.

### Book phòng

Toàn bộ phòng mỗi khi load đều được lưu vào Localstorage theo ID, tính toán tiền phòng là dựa theo server, không phải
Client, dựa vào list các phòng đặt, thời gian để
server tính toán, có thể dùng nút "Calculate total" để tính trước tiền phòng trên Client.
Click vào "Reserve now" sẽ thực hiện post request tới server /booking , với post request chứa toàn bộ các phòng (với một
số phòng được chọn). Phòng được đặt và không đặt sẽ được xử lí tại server

### Search hotel

Post request tới /search trên server, với body là context

