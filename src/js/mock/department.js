/**
 * 部门管理 mock数据设计
 *
 * @summary Card Mock
 * @author PDK
 *
 * Created at     : 2019-03-23
 * Last modified  : 2019-03-23
 */

const Mock = require('mockjs')

/**
 * @获取所有首页的卡片数据
 * @param {Object} payload
 * @return {*}
 */
Mock.mock('/mock/api/department/get-all?pageNum=1&pageSize=5', () => {
  return {
    code: 1,
    msg: '获取成功',
    data: {
      current: 1,
      size: 5,
      total: 9,
      list: [
        {
          id: 1,
          depart_name: '技术部',
          depart_content:
            '服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验.',
          depart_prefix: '{"depart_count":"600"}'
        },
        {
          id: 2,
          depart_name: '营运部',
          depart_content:
            '营运部作为一个综合职能部门，是对公司经营管理的全过程进行计划执行和控制。对公司的各个门店日常经营行为及业务、财务等运营流程和相互衔接执行具体的指导、协调和监督职能。在操作过程中，应做到指导有方、协调有度、监督有力.',
          depart_prefix: '{"depart_count":"214"}'
        },
        {
          id: 3,
          depart_name: '编辑部',
          depart_prefix: '{"depart_count":"25"}',
          depart_content:
            '一般是负责报纸刊物的市场调研，选题开发，选题列选，选题报批，约稿，出版合同，审稿，成本开支估算，发稿，审读校样，签发付印样，审读样书，结算稿费等事务的部门。'
        },
        {
          id: 4,
          depart_name: '市场部',
          depart_prefix: '{"depart_count":"98"}',
          depart_content:
            '市场部的工作主要目标是树立品牌，扩大品牌知名度、提升美誉度，给客户提供产品购买的理由和刺激。而销售部门的工作就是如何把产品送到客户面前，并成功的收回资金，实现商品的价值.'
        },
        {
          id: 5,
          depart_name: '销售部',
          depart_prefix: '{"depart_count":"354"}',
          depart_content:
            '销售部是企业市场营销工作中满足市场需求的重要部门。企业在面对市场需求的时候，需要利用销售的手段满足市场的需求。但由于市场的需求方式、需求形态多种多样，也就造成了企业在销售行为的形式上、销售形态的管理上存在着不同的差异性。销售部门的成立与管理需要注意的是根据市场的形态制订相应的销售策略，而相应的策略达成也需要与之相匹配的管理形式才能实现。'
        },
        {
          id: 6,
          depart_name: '审核部',
          depart_prefix: '{"depart_count":"632"}',
          depart_content:
            '审核是为获得审核证据并对其进行客观评价，以确定满足审核准则的程度所进行的系统的、独立的并形成文件的过程；审查是对某项事情、情况的核实、核查。'
        },
        {
          id: 7,
          depart_name: '视频部',
          depart_prefix: '{"depart_count":"52"}',
          depart_content:
            '审核是为获得审核证据并对其进行客观评价，以确定满足审核准则的程度所进行的系统的、独立的并形成文件的过程；审查是对某项事情、情况的核实、核查。'
        },
        {
          id: 8,
          depart_name: '人力资源部',
          depart_prefix: '{"depart_count":"162"}',
          depart_content:
            '审核是为获得审核证据并对其进行客观评价，以确定满足审核准则的程度所进行的系统的、独立的并形成文件的过程；审查是对某项事情、情况的核实、核查。'
        },
        {
          id: 9,
          depart_name: '研发部',
          depart_prefix: '{"depart_count":"621"}',
          depart_content:
            '审核是为获得审核证据并对其进行客观评价，以确定满足审核准则的程度所进行的系统的、独立的并形成文件的过程；审查是对某项事情、情况的核实、核查。'
        }
      ]
    }
  }
})
