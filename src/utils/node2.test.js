import {expect} from 'chai';
import {nodeGetAllChildrenId, nodeSibling, nodePrevSibling, nodeGetFirstChild, getRootPath, getRootPathAndContent} from "./node2"

describe('node2', function () {
  it('getAllChildrenId() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root"}, 
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(nodeGetAllChildrenId("BN1", nodes).length).to.equal(0)
    expect(nodeGetAllChildrenId("BN4", nodes)[0]).to.equal("BN5")

    expect(nodeGetAllChildrenId("BN3", nodes)[0]).to.equal('BN4')
    expect(nodeGetAllChildrenId("BN3", nodes)[1]).to.equal('BN5')

    expect(nodeGetAllChildrenId("BNx", nodes)[0]).to.equal('BN1')
    expect(nodeGetAllChildrenId("BNx", nodes)[1]).to.equal('BN2')
    expect(nodeGetAllChildrenId("BNx", nodes)[2]).to.equal('BN3')
    expect(nodeGetAllChildrenId("BNx", nodes)[3]).to.equal('BN4')
    expect(nodeGetAllChildrenId("BNx", nodes)[4]).to.equal('BN5')
    //
  })

  it('nodeSibling() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root"},
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(nodeSibling("BN1", nodes)).to.equal('BN2')
    expect(nodeSibling("BN2", nodes)).to.equal('BN3')
    expect(nodeSibling("BN3", nodes)).to.equal(null)
  })

  it('nodePrevSibling() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root"},
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(nodePrevSibling("BN1", nodes)).to.equal(null)
    expect(nodePrevSibling("BN2", nodes)).to.equal('BN1')
    expect(nodePrevSibling("BN3", nodes)).to.equal('BN2')
  })

  it('nodeGetFirstChild() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root"},
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(nodeGetFirstChild("BN1", nodes)).to.equal(null)
    expect(nodeGetFirstChild("BN2", nodes)).to.equal(null)
    expect(nodeGetFirstChild("BN3", nodes)).to.equal('BN4')
  })

  it('getRootPath() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root", children: ['BNx']},
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(getRootPath("BN1", nodes)[0]).to.equal('root')
    expect(getRootPath("BN1", nodes)[1]).to.equal('BNx')
    expect(getRootPath("BN1", nodes).length).to.equal(2)
  })

  it('getRootPathAndContent() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root", content:"", children: ['BNx']},
      BNx: {id: 'BNx',content: 'hello', children:["BN1","BN2",'BN3']}
    }
    expect(JSON.stringify(getRootPathAndContent("BNx",nodes)))
      .to.equal(JSON.stringify([{id:'root', content:'Home'}, {id: 'BNx', content:'hello'}]))

    expect(JSON.stringify(getRootPathAndContent("BN1",nodes)))
      .to.equal(JSON.stringify([{id:'root', content:'Home'}, 
                               {id: 'BNx', content:'hello'},
                               {id: 'BN1', content:'taobao'},
      ]))
  })


})
