'use client';
import { SearchInput, Wrapper } from '@/components/shared';
import { PhoneFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import HeaderTopItem from './partials/HeaderTopItem';
import { EMPTY_IMAGE } from '@/constants';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { IProductCart } from '@/store/cart/cartSlice';

const { Search } = Input;

type TTopHeaderProps = {
  logo?: string;
};

const TopHeader = ({ logo }: TTopHeaderProps) => {
  /** handle search function */
  const onSearch = (value: string) => console.log(value);
  const {cartList} = useAppSelector((state) => state.cart);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  useEffect(() => {
    if (cartList) {
      const value = cartList?.reduce((prev: number, crr: IProductCart) => {
        console.log(prev, crr);
        return prev + crr.quantity;
      }, 0);
      setCartQuantity(value)
    }
  }, [cartList]);

  return (
    <div>
      <Wrapper className="!py-4">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full overflow-hidden !cursor-pointer">
            <Link className="" href="/">
              <Image
                className="w-full h-full object-contain"
                src={logo ?? EMPTY_IMAGE}
                alt="hai tra tan logo"
                width={0}
                height={0}
              />
            </Link>
          </div>
          {/* search engine */}
          <div className="max-xs:hidden sm:hidden max-sm:hidden md:hidden lg:block">
            <SearchInput
              width={400}
              placeholder="Nhập Từ Khoá"
              onSearch={onSearch}
            />
          </div>
          {/* shopping cart and hotline */}

          <div className="flex items-center justify-between gap-16">
            <HeaderTopItem
              icon={<PhoneFilled className="text-[30px] text-app-500" />}
              title="Hotline"
              subTitle="0974 644 973"
              className="max-xs:hidden sm:hidden max-sm:hidden md:hidden lg:flex"
              cart={false}
            />
            <HeaderTopItem
              className="cursor-pointer"
              icon={
                <ShoppingCartOutlined className="text-[32px] lg:text-[42px] text-app-500" />
              }
              title="Giỏ Hàng"
              subTitle="Sản Phẩm"
              cartContent={cartQuantity}
              cart={true}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default TopHeader;
