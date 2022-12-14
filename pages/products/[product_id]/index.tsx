import {
  Button,
  Flex,
  FlexProps,
  Grid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";

import Breadcrumb from "../../../components/Breadcrumb";
import ColorButton from "../../../components/ColorButton";
import Container from "../../../components/Container";
import { useResponsive } from "../../../hooks/useResponsive";
import NotAuthProvider from "../../../layout/NotAuthProvider";
import Page from "../../../layout/Page";
import { ProductCartType } from "../../../models/cart";
import { ProductColor, ProductType } from "../../../models/product";
import MinusIcon from "../../../public/svg/minus.svg";
import PlusIcon from "../../../public/svg/plus.svg";
import StarIcon from "../../../public/svg/star.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actions, selectors } from "../../../redux/reducer";
import { addProductCart, updateCartQuantity } from "../../../services/cart";
import { getProductById } from "../../../services/product";

type Props = {} & FlexProps;

const initProductCart: ProductCartType = {
  product_id: "",
  img: "",
  title: "",
  price: 0,
  quantity: 1,
  color: ProductColor.BLACK,
};

const Product = ({ ...props }: Props) => {
  const router = useRouter();
  const { product_id } = router.query;
  const productId = product_id?.toString();
  const [product, setProduct] = useState<ProductType>();
  const { t } = useTranslation();
  const [addedProduct, setAddedProduct] =
    useState<ProductCartType>(initProductCart);
  const [currentSlide, setCurrentSlide] = useState<string>();
  const dispatch = useAppDispatch();
  const userCart = useAppSelector(selectors.user.selectUserCart);
  const userId = useAppSelector(selectors.user.selectUserId);
  const { isMobile, isSmallDevice } = useResponsive();

  const isAvailable = useMemo(
    () => (product ? product?.storage_quantity > 0 : false),
    [product]
  );

  const handleGetProduct = useCallback(async () => {
    if (productId) {
      const data = await getProductById(productId);
      setProduct(data);
      setCurrentSlide(data.img);
      setAddedProduct({
        product_id: data._id,
        img: data.img,
        title: data.title,
        price: data.price,
        quantity: 1,
        color: data.colors[0],
      });
    }
  }, [productId]);

  const handleQuantity = (isMinus: boolean) => {
    if (isMinus) {
      if (addedProduct.quantity === 1) return;
      setAddedProduct({ ...addedProduct, quantity: addedProduct.quantity - 1 });
    } else {
      if (addedProduct.quantity === product?.storage_quantity) return;
      setAddedProduct({ ...addedProduct, quantity: addedProduct.quantity + 1 });
    }
  };

  const handleAddProduct = async () => {
    try {
      const isExistInCart =
        userCart.findIndex(
          (item) =>
            item.product_id === addedProduct.product_id &&
            item.color === addedProduct.color
        ) > -1;
      if (isExistInCart) {
        const newCart = await updateCartQuantity({
          product_id: addedProduct.product_id,
          quantity: addedProduct.quantity,
          color: addedProduct.color,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(
            addedProduct.quantity * addedProduct.price
          )
        );
      } else {
        const newCart = await addProductCart({
          product_id: addedProduct.product_id,
          quantity: addedProduct.quantity,
          color: addedProduct.color,
        });
        dispatch(actions.user.setUserCart(newCart));
        dispatch(
          actions.user.setUserCartTotal(
            addedProduct.quantity * addedProduct.price
          )
        );
      }

      router.push("/cart");
    } catch (error) {}
  };

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return (
    <NotAuthProvider>
      <Page w="full" direction="column" title={product?.title || "Product"}>
        <Breadcrumb
          links={[
            { title: t("home"), href: "/" },
            { title: t("products"), href: "/products" },
            { title: product?.title || "", href: "/" },
          ]}
          current={product?.title || ""}
        />
        <Container direction="column">
          <Flex marginY="2.5rem">
            <Link href="/products">
              <Button colorScheme="orange">
                <Text>{t("back_to_products")}</Text>
              </Button>
            </Link>
          </Flex>
          {product ? (
            <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
              <Flex w="full" direction="column">
                <Flex
                  position="relative"
                  w="full"
                  h={isSmallDevice ? "360px" : isMobile ? "500px" : "560px"}
                  borderRadius="1rem"
                  overflow="hidden"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN}${currentSlide}`}
                    fill
                    alt={product._id}
                  />
                </Flex>
                <Grid
                  templateColumns={
                    isSmallDevice ? "1fr 1fr" : "1fr 1fr 1fr 1fr"
                  }
                  gap="1.5rem"
                  h={isSmallDevice ? "240px" : "100px"}
                  w="full"
                  mt="1rem"
                >
                  <Flex
                    position="relative"
                    w="full"
                    h="full"
                    borderRadius="0.5rem"
                    cursor="pointer"
                    opacity={currentSlide === product.img ? 1 : 0.7}
                    overflow="hidden"
                    _hover={{ opacity: 1 }}
                    transition="all 200ms ease-in-out"
                    onClick={() => setCurrentSlide(product.img)}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN}${product.img}`}
                      style={{ objectFit: "cover" }}
                      fill
                      alt={product.title}
                    />
                  </Flex>
                  {product.gallery.map((item) => (
                    <Flex
                      position="relative"
                      w="full"
                      h="full"
                      borderRadius="0.5rem"
                      cursor="pointer"
                      opacity={currentSlide === item ? 1 : 0.7}
                      overflow="hidden"
                      _hover={{ opacity: 1 }}
                      transition="all 200ms ease-in-out"
                      onClick={() => setCurrentSlide(item)}
                      key={item}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDN}${item}`}
                        fill
                        alt={item}
                      />
                    </Flex>
                  ))}
                </Grid>
              </Flex>
              <Flex
                direction="column"
                w="full"
                ml={isMobile ? "0" : "2rem"}
                mt={isMobile ? "2rem" : "0"}
              >
                <Text fontSize="3xl" fontWeight="bold">
                  {product.title}
                </Text>
                <Flex mt="0.25rem" w="full" alignItems="center">
                  <Rating
                    emptyIcon={
                      <StarIcon
                        style={{
                          width: 24,
                          height: 24,
                          display: "inline-block",
                        }}
                      />
                    }
                    fillIcon={
                      <StarIcon
                        style={{
                          width: 24,
                          height: 24,
                          fill: "rgb(255, 188, 11)",
                          display: "inline-block",
                        }}
                      />
                    }
                    initialValue={product.rating?.rate || 3}
                    readonly
                  />
                  <Text ml="1rem">
                    {product.review?.length || 100} {t("customer_review")}
                  </Text>
                </Flex>
                <Text mt="0.25rem" fontSize="xl" fontWeight="semibold">
                  ${product.price}
                </Text>
                <Text fontSize="normal" lineHeight={1.8} mt="1rem">
                  {product.description}
                </Text>

                <Grid mt="1rem" templateColumns="150px 1fr">
                  <Text fontWeight="semibold">{t("available")}:</Text>
                  <Text>{isAvailable ? t("in_stock") : t("out_of_stock")}</Text>
                </Grid>
                <Grid mt="0.5rem" templateColumns="150px 1fr">
                  <Text fontWeight="semibold">{t("sku")}:</Text>
                  <Text>{product.sku}</Text>
                </Grid>
                <Grid mt="0.5rem" templateColumns="150px 1fr">
                  <Text fontWeight="semibold">{t("brand")}:</Text>
                  <Text>{t(product.brand)}</Text>
                </Grid>
                <Flex mt="1rem" bg="rgba(0,0,0,0.6)" h="1px" w="full" />
                <Grid mt="1rem" templateColumns="150px 1fr">
                  <Text fontWeight="semibold">{t("colors")}:</Text>
                  <Flex>
                    {product.colors.map((color) => (
                      <ColorButton
                        mr="0.5rem"
                        product_color={color}
                        key={color}
                        active={addedProduct?.color === color || false}
                        onClick={() =>
                          setAddedProduct({ ...addedProduct, color })
                        }
                      />
                    ))}
                  </Flex>
                </Grid>
                <Flex alignItems="center" mt="1.5rem">
                  <Button
                    variant="unstyled"
                    w={isMobile ? "40px" : "auto"}
                    onClick={() => handleQuantity(true)}
                  >
                    <MinusIcon />
                  </Button>
                  <Text
                    marginX="0.5rem"
                    textAlign="center"
                    w="60px"
                    fontWeight="semibold"
                    fontSize="4xl"
                  >
                    {addedProduct.quantity}
                  </Text>
                  <Button
                    variant="unstyled"
                    w={isMobile ? "40px" : "auto"}
                    onClick={() => handleQuantity(false)}
                  >
                    <PlusIcon />
                  </Button>
                </Flex>
                {isAvailable && (
                  <Flex mt="2rem">
                    {userId ? (
                      <Button
                        colorScheme="orange"
                        onClick={() => handleAddProduct()}
                      >
                        {t("add_to_cart")}
                      </Button>
                    ) : (
                      <Link href="/login">
                        <Button colorScheme="orange">
                          {t("please_login")}
                        </Button>
                      </Link>
                    )}
                  </Flex>
                )}
              </Flex>
            </Grid>
          ) : (
            <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
              <Flex w="full" direction="column">
                <Skeleton
                  w="full"
                  h={isSmallDevice ? "360px" : isMobile ? "500px" : "560px"}
                  borderRadius="1rem"
                />
                <Grid
                  templateColumns={
                    isSmallDevice ? "1fr 1fr" : "1fr 1fr 1fr 1fr"
                  }
                  gap="1.5rem"
                  h={isSmallDevice ? "240px" : "100px"}
                  w="full"
                  mt="1rem"
                >
                  <Skeleton w="full" h="full" />
                  <Skeleton w="full" h="full" />
                  <Skeleton w="full" h="full" />
                  <Skeleton w="full" h="full" />
                </Grid>
              </Flex>
              <Flex
                direction="column"
                w="full"
                ml={isMobile ? "0" : "2rem"}
                mt={isMobile ? "2rem" : "0"}
              >
                <Flex>
                  <Skeleton>
                    <Text fontSize="3xl" fontWeight="bold">
                      Invisible Text
                    </Text>
                  </Skeleton>
                </Flex>

                <Flex mt="0.25rem">
                  <Skeleton w="120px" />
                  <Skeleton ml="1rem">
                    <Text>100 customers review</Text>
                  </Skeleton>
                </Flex>
                <Flex mt="0.25rem">
                  <Skeleton>
                    <Text fontSize="xl">$99.99</Text>
                  </Skeleton>
                </Flex>
                <SkeletonText
                  noOfLines={6}
                  mt="1rem"
                  spacing={5}
                  skeletonHeight={4}
                />
                <Grid mt="1rem" templateColumns="150px 1fr">
                  <Flex>
                    <Skeleton>
                      <Text fontWeight="semibold">{t("available")}:</Text>
                    </Skeleton>
                  </Flex>
                  <Skeleton>
                    <Text>Invisible Place</Text>
                  </Skeleton>
                </Grid>
                <Grid mt="0.5rem" templateColumns="150px 1fr">
                  <Flex>
                    <Skeleton>
                      <Text fontWeight="semibold">{t("sku")}:</Text>
                    </Skeleton>
                  </Flex>
                  <Skeleton>
                    <Text>Invisible Place</Text>
                  </Skeleton>
                </Grid>
                <Grid mt="0.5rem" templateColumns="150px 1fr">
                  <Flex>
                    <Skeleton>
                      <Text fontWeight="semibold">{t("brand")}:</Text>
                    </Skeleton>
                  </Flex>
                  <Skeleton>
                    <Text>Invisible Place</Text>
                  </Skeleton>
                </Grid>
                <Flex mt="1rem" bg="rgba(0,0,0,0.6)" h="1px" w="full" />
                <Grid mt="1rem" templateColumns="150px 1fr">
                  <Flex>
                    <Skeleton>
                      <Text fontWeight="semibold">{t("colors")}:</Text>
                    </Skeleton>
                  </Flex>
                  <Skeleton>
                    <Text>Invisible Place</Text>
                  </Skeleton>
                </Grid>
              </Flex>
            </Grid>
          )}
        </Container>
      </Page>
    </NotAuthProvider>
  );
};

export default Product;
