package mybatisUtil.page;
import java.util.Iterator;
import java.util.List;

public class Page<T> implements Iterable<T> {
    private int currentPage = 1;
    private int pageSize = 10;
    private int prePage;
    private int nextPage;
    private int totalRow;
    private int totalPage;
    private List<T> result;

    public Page() {
    }

    public Page(int currentPage) {
        this.setCurrentPage(currentPage);
    }

    public Page(int currentPage, int pageSize) {
        this.setCurrentPage(currentPage);
        this.setPageSize(pageSize);
    }

    public int getCurrentPage() {
        return this.currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
        if(this.currentPage < 1) {
            this.currentPage = 1;
        }

    }

    public int getTotalRow() {
        return this.totalRow;
    }

    public void setTotalRow(int totalRow) {
        if(totalRow > 0) {
            this.totalRow = totalRow;
        }

    }

    public int getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(int pageSize) {
        if(pageSize > 0) {
            this.pageSize = pageSize;
        }

    }

    public int getOffset() {
        int page_index = this.getCurrentPage() - 1;
        page_index = page_index < 0?0:page_index;
        return page_index * this.pageSize;
    }

    public int getTotalPage() {
        return (int)Math.ceil((double)this.getTotalRow() / (double)this.getPageSize());
    }

    public int getNextPage() {
        return this.nextPage;
    }

    public int getPrePage() {
        return this.prePage;
    }

    public void refresh() {
        if(this.totalRow == 0) {
            this.currentPage = 1;
            this.totalPage = 1;
        } else {
            this.totalPage = this.getTotalPage();
            this.currentPage = this.currentPage < 1?1:this.currentPage;
            this.currentPage = this.currentPage > this.totalPage?this.totalPage:this.currentPage;
        }

        this.nextPage = this.currentPage < this.totalPage?this.currentPage + 1:this.totalPage;
        this.prePage = this.currentPage > 1?this.currentPage - 1:1;
    }

    public void setResult(List<T> elements) {
        if(elements == null) {
            throw new IllegalArgumentException("Page's 'result' must be not null!");
        } else {
            this.result = elements;
        }
    }

    public List<T> getResult() {
        return this.result;
    }

    public Iterator<T> iterator() {
        return this.result == null?null:this.result.iterator();
    }

    public boolean hasNextPage() {
        return this.getCurrentPage() < this.getTotalPage();
    }

    public boolean isLastPage() {
        return !this.hasNextPage();
    }
}

