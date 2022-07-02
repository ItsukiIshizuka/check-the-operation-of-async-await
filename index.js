async function asyncAwaitFunc() {
  console.log("asyncAwaitFunc開始");

  // 成功する非同期処理
  await sleepFetch(4000)
    .then(res => {
      console.log(res)
      console.log("sleepFetch終了")
    })
    .catch(err => {
      return Promise.reject(err);
    })
  
  // 例外が発生する非同期処理
  await sleepFetchWithThrowError(3000)
    .then(res => {
      console.log(res);
      console.log("sleepFetchWithThrowError終了")
    })
    .catch(err => {
      return Promise.reject(err); //asyncはPromiseなので、処理に例外が発生した場合は、throwまたはrejectでPromiseStatusをrejectにしてreturnする
    });

  return Promise.resolve("asyncAwaitFunc処理完了") //全てのawaitが成功したらresolveをreturnする
}

// Promiseの中で非同期処理を実行する(非同期処理"成功"バージョン)
function sleepFetch(ms){
  console.log("SleepFetch開始")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("SleepFetch処理中...");
      resolve("SleepFetch成功");
    }, ms)
  });
}

// Promiseの中で非同期処理を実行する(非同期処理"失敗"バージョン)
function sleepFetchWithThrowError(ms){
  console.log("sleepFetchWithThrowError開始")
  return new Promise((resolve, reject) => {
    setTimeout(() => {  //このsetTimeout()の中で例外が発生したとする
      try {
        console.log("sleepFetchWithThrowError処理中");
        throw new Error("sleepFetchWithThrowErrorで非同期例外が出てしまった！！！"); //ここで例外発生
        resolve("sleepfetchWithThrowError成功")
      } catch(err) {
        console.log("sleepFetchWithThrowError失敗")
        return reject(err); //ここでsetTimeoutで発生した例外内容をreject()としてreturnする
      }
    }, ms);
  });
}


// 処理実行
asyncAwaitFunc()
  .then((res) => {
    console.log(`【asyncAwaitFuncのthen】 ${res}`);
  })
  .catch(err => {
    console.log(`【asyncAwaitFuncのcatch】 ${err}`);
  })