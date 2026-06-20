import useGetBestSellerProduct from "./useGetBestSellerProduct";

// Fake
import { fakeDataProduct } from "constant/fakeData";

// jest
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("useGetBestSellerProduct", () => {
  const idCategory = "65237b737694bfdb5aa27be2";
  const limit = 10;

  const mockGetTopProduct = jest
    .fn(idCategory, limit)
    .mockResolvedValue(fakeDataProduct);

  it("should be render", async () => {
    const { result } = renderHook(() =>
      useGetBestSellerProduct({ getTopProduct: mockGetTopProduct })
    );

    expect(result.current).toBeDefined();
  });

  it("should load initially", () => {
    const { result } = renderHook(() =>
      useGetBestSellerProduct({ getTopProduct: mockGetTopProduct })
    );

    expect(result.current.dataProduct).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should show data product best seller ", async () => {
    const { result } = renderHook(() =>
      useGetBestSellerProduct({ getTopProduct: mockGetTopProduct })
    );

    expect(result.current.dataProduct).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await result.current.getDataProduct();
    });

    expect(result.current.dataProduct).toEqual(fakeDataProduct);
    expect(result.current.isLoading).toBe(false);

    jest.advanceTimersByTime(750);

    expect(result.current.isLoading).toBe(false);
  });
});
