import { HttpMethod } from "@comeback/types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
	private axiosInstance: AxiosInstance;

	constructor(readonly baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
		});
	}

	// Generic request method
	public async request<T>(
		method: HttpMethod,
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		try {
			const response: AxiosResponse<T> =
				await this.axiosInstance.request<T>({
					method,
					url,
					data,
					...config,
				});
			return response.data;
		} catch (error) {
			// Handle error appropriately, maybe throw a custom error or log it
			throw error;
		}
	}

	// Helper methods for specific HTTP methods
	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.request<T>("GET", url, undefined, config);
	}

	public async post<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.request<T>("POST", url, data, config);
	}

	public async put<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.request<T>("PUT", url, data, config);
	}

	public async delete<T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.request<T>("DELETE", url, undefined, config);
	}
}

export default ApiClient;

export function createApiClient(baseUrl: string) {
	return new ApiClient(baseUrl);
}
