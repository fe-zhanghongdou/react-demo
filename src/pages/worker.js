self.onmessage = (event) => {
  const { type, data, pageNum, pageSize } = event.data;
  if (type === 'PAGINATE') {
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    const curPageData = data.slice(start, end);
    
  
    self.postMessage({
      eventName: 'PAGINATE_RESULT',
      result: curPageData
    })
  }

}