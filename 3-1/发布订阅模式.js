// 观察者模式
class Publisher {
    constructor() {
      this.observers = [];
    }
  
    add(observer) {
      this.observers.push(observer);
    }
  
    remove(observer) {
      this.observers.map((item, i) => {
        if (item === observer) {
          this.observers.splice(i, 1);
        }
      });
    }
  
    // 通知所有订阅者
    notify() {
      this.observers.map((item, i) => {
        item.update(this);
      });
    }
  }
  
  // 定义订阅者类
  class Observer {
    constructor() {
      console.log('创建订阅者');
    }
  
    update() {
      console.log('订阅者更新');
    }
  }
  
  let Pub1 = new Publisher();
  let ob1 = new Observer();
  
  Pub1.add(ob1);
  Pub1.notify();
  
  //
  
  // 发布订阅模式
  
  class Sub {
    constructor() {
      // 事件中心
      this.events = {};
    }
  
    // 订阅方法
    subscribe(type, cb) {
      if (!this.events[type]) {
        this.events[type] = [];
      }
      this.events[type].push(cb);
    }
  
    // 发布方法
    publish(type, ...args) {
      if (this.events[type]) {
        this.events[type].forEach((cb) => cb(...args));
      }
    }
  
    // 取消订阅方法
    unsubscribe(type, cb) {
      if (this.events[type]) {
        const cbIndex = this.events[type].findIndex((e) => e === cb);
        if (cbIndex != -1) {
          this.events[type].splice(cbIndex, 1);
        }
      }
      if (this.events[type].length === 0) {
        delete this.events[type];
      }
    }
  
    unsubscribeAll(type) {
      if (this.events[type]) {
        delete this.events[type];
      }
    }
  }
  
  let Sub1 = new Sub();
  
  // 弟子一订阅战斗任务
  Sub1.subscribe('warTask', function (taskInfo) {
    console.log('宗门殿发布战斗任务，任务信息:' + taskInfo);
  });
  
  // 弟子二订阅日常任务
  Sub1.subscribe('routeTask', function (taskInfo) {
    console.log('宗门殿发布日常任务，任务信息:' + taskInfo);
  });
  
  // 弟子三订阅全类型任务
  Sub1.subscribe('allTask', function (taskInfo) {
    console.log('宗门殿发布五星任务，任务信息:' + taskInfo);
  });
  
  // 发布战斗任务
  Sub1.publish('allTask', '猎杀时刻');
  // Sub1.publish('allTask', "猎杀时刻");
  
  // // 发布日常任务
  // pubsub.publish('routeTask', "种树浇水");
  // pubsub.publish('allTask', "种树浇水");
  