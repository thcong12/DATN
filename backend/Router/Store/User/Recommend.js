import express from "express";
import asyncHandler from "express-async-handler";
import userAuth from "../../../middleware/UserAuth.js";
import DataSet from "../../../model/Recomend/DataSet.js";
import DataSetForProduct from "../../../model/Recomend/DataSetForProduct.js";

const routerReconmend = express.Router();

routerReconmend.use(userAuth)
//#region Get bộ data recommend
async function getAllDataRecommend() {
  const data = await DataSetForProduct.find();
  return data;
}
//get persion by userID
async function getPerson(userId) {
  const user = await DataSetForProduct.find({
    userId: userId,
  });
  return user;
}
const len = function (obj) {
  var len = 0;
  for (var i in obj) {
    len++;
  }
  return len;
};

//lọc user trùng nhau
async function deduplicate() {
  const data = await DataSetForProduct.aggregate([
    {
      $group: {
        _id: "$userId",
      },
    },
  ])
  return data

}

//Kiểm tra tồn tại by bookID
async function isExist2(data, element, dataInit) {
  for (var key in data) {
    if (data[key][dataInit] == element[dataInit]) {
      return true;
    }
  }
  return false;
}
// lọc các value cần check = 0 ( rate = 0)
// async function DeleteCheckZero(data, value) {
//   const dataNew = [];
//   for (var key in data) {
//     if (data[key][value] != 0) {
//       if (value == "click") {
//         if (data[key][value] > 0) {
//           dataNew.push(data[key]);
//         }
//       } else {
//         dataNew.push(data[key]);
//       }
//     }
//   }

//   return dataNew;
// }
//Kiểm tra sản phẩm xem người dùng đã mua hay chưa
async function CheckIsBuy(data, element) {
  for (var key in data) {
    if (data[key].productId == element) {
      if (data[key].click != 0) return true;
      return false;
    }
  }
  return false;
}
//compare 2 person by BookID  ---> value check (rate)

//Tính hệ số tương quan giữa hai người dùng p1 và p2
//dataInit ứng với Book ; value ứng với rate
async function pearson_correlation(dataset, p1, p2, dataInit, value) {
  try {
    const existp1p2 = {}; //Lưu lại biến khi p1[dataInit]=p2[dataInit]
    const person1 = await getPerson(p1); //Lấy data người dùng p1
   
    const person2 = await getPerson(p2); //Lấy data người dùng p2
    // const Person1 = await DeleteCheckZero(Person1Get, value); //Loại bỏ những data có rate = 0 (Chưa đánh giá)
    // const Person2 = await DeleteCheckZero(Person2Get, value); //Loại bỏ những data có rate = 0 (Chưa đánh giá)
    for (let key1 in person1) {
      for (let key2 in person2) {

        if (person1[key1].click == person2[key2].click) {

          existp1p2[person1[key1][dataInit]] = 1; //Lưu lại biến khi p1[dataInit]=p2[dataInit]
          break;
        }
      }
    }
    var num_existence = len(existp1p2); //số lượng dataInit giống nhau
    console.log(num_existence)
    if (num_existence == 0) return 0;
    // lưu tổng và tổng bình phương của cả p1 và p2
    // lưu trữ sản phẩm của cả hai
    var p1_sum = 0, //tổng p1
      p2_sum = 0, //tổng p2
      p1_sq_sum = 0, //tổng bình phương p1
      p2_sq_sum = 0, //tổng bình phương p2
      prod_p1p2 = 0, //tổng tích p1 p2
      p1_cur = 0,
      p2_cur = 0;
    // tính tổng và bình phương của mỗi điểm dữ liệu
    // và cũng là sản phẩm của cả hai điểm
    for (var key in existp1p2) {
      for (var key1 in person1) {
        if (key == person1[key1][dataInit]) {
          p1_cur = person1[key1][value];
          p1_sum += person1[key1][value];
          p1_sq_sum += Math.pow(person1[key1][value], 2);
          break;
        }
      }
      for (var key2 in person2) {
        if (key == person2[key2][dataInit]) {
          p2_cur = person2[key2][value];
          p2_sum += person2[key2][value];
          p2_sq_sum += Math.pow(person2[key2][value], 2);
          break;
        }
      }
      prod_p1p2 += p1_cur * p2_cur;
    }
    var numerator = prod_p1p2 - (p1_sum * p2_sum) / num_existence;
    var st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
    var st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
    var denominator = Math.sqrt(st1 * st2);
    if (denominator == 0) return 0;
    else {
      var val = numerator / denominator;
      console.log(val)
      return val;
    }
  } catch (err) {
    return res.status(501).json(err);
  }
}

// check by

// dataset : bộ dữ liệu
// person : user đăng nhập
// pearson_correlation : function work
//validRecommend : thuộc tính dùng để set Recommend ( rate, category,author)
async function recommendation_eng(
  dataset,
  person,
  pearson_correlation,
  dataInit,
  value
) {
  var totals = {
    setDefault: function (props, aValue) {
      if (!this[props]) {
        this[props] = 0;
      }
      this[props] += aValue;
    },
  };
  var simsum = {
    setDefault: function (props, aValue) {
      if (!this[props]) {
        this[props] = 0;
      }
      this[props] += aValue;
    },
  };
  var rank_lst = []; //danh sách xếp hạng kết quả tương thích của item
  const person2 = await getPerson(person);
  // const dataPerson2 = await DeleteCheckZero(Person2Get, value);
  // console.log("Person2Get")
  // console.log(Person2Get)
  // console.log('dataPerson2')
  // console.log(dataPerson2)
  // Lọc tên trùng
  var datafilter = await deduplicate();
  
  console.log(datafilter)
  for (let other in datafilter) {
    if (datafilter[other]._id == person) continue;
    const similar = await pearson_correlation(
      dataset,
      person,
      datafilter[other]._id,
      dataInit,
      value
    );
    console.log('cascas')
    console.log(similar)
    if (similar <= 0) continue; //kiểm tra hệ số tương quan <=0 tức là không liên hệ gì với nhau
    const person1 = await getPerson(datafilter[other]._id);
    for (var data1 in person1) {
      //Kiểm tra dataInit trong dataPerson1[data1] có tồn tại trong dataPerson2 không
      if (!(await isExist2(person2, person1[data1], dataInit))) {
        //nếu không tồn tại thì dự đoán hệ số tương quan sản phẩm
        //tính trung bình theo hệ số tương quan
        totals.setDefault(
          person1[data1][dataInit],
          person1[data1][value] * similar
        );
        simsum.setDefault(person1[data1][dataInit], similar);
      }
    }
  }
  for (var item in totals) {
    if (typeof totals[item] != "function") {
      //tính trung bình theo hệ số tương quan
      var val = totals[item] / simsum[item];
      rank_lst.push({ val: val, items: item });
    }
  }
  rank_lst.sort(function (a, b) {
    //sắp xếp theo thứ tự giảm dần
    return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  });
  console.log(rank_lst)
  var recommend = [];
  for (var i in rank_lst) {
    //nếu đã mua rồi thì không hiện nữa
    if (!(await CheckIsBuy(person2, rank_lst[i].items))) {
      recommend.push(rank_lst[i].items);
    }
  }
  console.log('accc')
  return recommend; //danh sách id book
}

//#endregion
//các value cột trong datasets
// 0: _id
// 1: bookID
// 2: userID
// 3: rate
// 4: buy
// 5: click
// 6: categoryID
// 7: authorID
// 8: seriID
// 9: priceBook
// 10: sale
// (1,6,7,8,9,10) ---> dataInit
// (3,4,5) ---> value
routerReconmend.get(
  "/data",
  asyncHandler(async (req, res) => {
    const datasets = await getAllDataRecommend();
    //recommend Book
    const userId = req.user_id
    var book_buy = await recommendation_eng(
      datasets,
      userId,
      pearson_correlation,
      "productId",
      "click"
    );

    //recommend category
    // var category_rate = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'categoryID', 'rate');
    // var category_click = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'categoryID', 'click');
    // var category_buy = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'categoryID', 'buy');
    //recommend author
    // var author_rate = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'atuhorID', 'rate');
    // var author_click = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'authorID', 'click');
    // var author_buy = await recommendation_eng(datasets, req.body.userID, pearson_correlation, 'authorID', 'buy');
    //recommend seri
    //recommend sale
    //recommend priceBook
    // const test = await getPerson(req.body.userID)
    // const test = await getAllBook();
    // for (var index in test) {

    //     const testUpdate = await UpdateBookSaleByBookID(test[index]._id)
    //         // console.log(testUpdate)
    // }

    //test data
    // const a = await getPerson(req.body.userID)
    // console.log(DeleteCheckZero(a, "click"))
    res.json({
      buy: book_buy,
      // ,
      // category: { click: category_click, rate: category_rate, buy: category_buy },
      // author: { click: author_click, rate: author_rate, buy: author_buy }
    });
  })
);

async function getBookByListID(req) {
  try {
    var listBook = [];
    for (let index in req) {
      const aBook = await book.findById(req[index]);
      listBook.push(aBook);
    }
    return listBook;
  } catch (error) {}
}

// async function getAllBook(req, res) {
//     try {
//         const getall = book.find({})

//         return getall
//     } catch (error) {

//     }
// }
// async function UpdateBookSaleByBookID(req) {
//     try {
//         const testUpdate = await averageRating(req)
//         console.log(testUpdate)
//         const update = await book.findByIdAndUpdate(req, {
//             $set: {
//                 rate: testUpdate
//             }
//         }, {
//             new: true
//         })
//         return update
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function getRateByBookID(req) {
//     try {
//         const listRate = await rating.find({
//             bookID: req
//         })
//         return listRate
//     } catch (error) {

//     }
// }
// async function averageRating(req) {
//     const listRate = await getRateByBookID(req)

//     let total = parseFloat(0)
//     for (let index in listRate) {
//         total = total + parseFloat(listRate[index].star)
//     }
//     let average = Math.round(2 * (total / listRate.length)) / 2;
//     if (listRate.length == 0)
//         return { average: 0, count: 0 }
//     else
//         return { average: average, count: listRate.length }
// }

export default routerReconmend;
