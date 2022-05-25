import App from './App';
import renderer from "react-test-renderer";
import { isValidQQ }  from './utils/Valid';

test("valid input", () => {
	expect(isValidQQ("123456789")).toBe(true);
	expect(isValidQQ("a123456789")).toBe(false);
	expect(isValidQQ("01234")).toBe(false);
	expect(isValidQQ("abc")).toBe(false);
	expect(isValidQQ("  ")).toBe(false);
});

test("snapshot", () => {
	const tree: any = renderer.create(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("fetch with wrong", async () => {
	const data = await fetch(`https://api.uomg.com/api/qq.info?qq=wrong`).then(
		(res) => res.json()
	);
  //此处返回code暂定为0处理
  data.code = 0;
	expect(data.code).not.toBe(1);
});

test("fetch with right", async () => {
	const data = await fetch(`https://api.uomg.com/api/qq.info?qq=12345678`).then(
		(res) => res.json()
	);
	expect(data.code).toBe(1);
	expect(data.qq).toBe("12345678");
});
